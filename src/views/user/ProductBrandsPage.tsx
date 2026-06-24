import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotificationStore } from "../../core/stores/notificationStore";
import type { BrandSearchParams, ProductBrand } from "../../core/types";
import { BoxAccent } from "../../components/ui/Boxes";
import { InputMain } from "../../components/ui/Inputs";
import { SelectMain } from "../../components/ui/Selects";
import { Link } from "react-router-dom";
import { ButtonDanger, ButtonMain } from "../../components/ui/Buttons";
import ProductBrandService from "../../app/ProductBrandService";
import { deleteConfirm, toLocaleDateTimeString, useDebounce } from "../../core/utils";
import { useUserStore } from "../../core/stores/userStore";

export default function ProductBrandsPage() {
    const setMessage = useNotificationStore(state => state.setMessage);
    const submitting = useUserStore(state => state.submitting);
    const fetching = useUserStore(state => state.fetching);
    const pbs = useMemo(() => new ProductBrandService(), []);
    const setMessageType = useNotificationStore(state => state.setMessageType);
    const [brands, setBrands] = useState<ProductBrand[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [hasMore, setHasMore] = useState(false);
    const [searchParams, setSearchParams] = useState<BrandSearchParams>({
        limit: 12,
        skip: 0,
        orderBy: "-",
        name: ""
    });

    const dName = useDebounce(searchParams.name);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const searchBrands = useCallback(async (currentSearchParams: BrandSearchParams) => {
        try {
            const response = await pbs.search(currentSearchParams);

            if (currentSearchParams.skip === 0) {
                setBrands(response.brands);
                setTotal(response.total);

                setHasMore(response.brands.length < response.total);
            } else {
                setBrands(prevBrands => {
                    const updated = [...prevBrands, ...response.brands];
                    setHasMore(response.total > updated.length);
                    return updated;
                });
            }
        } catch (err: unknown) {
            setMessage(err);
            setMessageType("danger");
        }
    }, [searchParams.limit]);

    const deleteBrand = async (brandId: number) => {
        try {
            await pbs.deleteBrand(brandId);
            setBrands(brands.filter(b => b.brandId !== brandId));
        } catch (err: unknown) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    useEffect(() => {
        searchBrands(searchParams);
    }, [dName, searchParams.limit, searchParams.orderBy, searchParams.skip]);

    useEffect(() => {
        if (fetching || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !fetching && hasMore) {
                    setSearchParams({ ...searchParams, skip: searchParams.skip + searchParams.limit });
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerRef.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [fetching, hasMore, searchParams.limit]);

    return (
        <div className="min-h-full">
            <h1 className="text-3xl my-3 text-center text-main">Search brand</h1>

            <BoxAccent customClasses={["grid grid-cols-12 gap-2"]}>
                <div className="sm:col-span-6 col-span-12 ">
                    <b className="block mb-2">Brand name</b>
                    <InputMain
                        placeholder="brand name"
                        type="text"
                        onChange={e => setSearchParams({ ...searchParams, name: e.target.value })}
                        value={searchParams.name}
                        customClasses={['w-full']}
                    />
                </div>
                <div className="sm:col-span-3 col-span-12">
                    <b className="block mb-2">Limit</b>
                    <SelectMain
                        options={[12, 24, 48]}
                        onChange={e => setSearchParams({ ...searchParams, limit: parseInt(e.target.value) })}
                        value={searchParams.limit}
                        customClasses={['w-full']}
                    />
                </div>

                <div className="sm:col-span-3 col-span-12">
                    <b className="block mb-2">Order by name</b>
                    <SelectMain
                        options={["-", "asc", "desc"]}
                        onChange={e => setSearchParams({ ...searchParams, orderBy: e.target.value })}
                        value={searchParams.orderBy}
                        customClasses={['w-full']}
                    />
                </div>
            </BoxAccent>

            <Link to="/user/brand">
                <ButtonMain
                    text="Add brand"
                    customClasses={["mx-auto my-2 block"]}
                />
            </Link>

            <div className="py-3">
                <h4 className="text-xl text-primary text-center">{total} brands found</h4>
            </div>

            <div className="grid grid-cols-12 gap-2 h-full">
                {
                    brands.map(b =>
                        <div key={b.brandId} className="md:col-span-4 sm:col-span-6 col-span-12 p-2 text-center">
                            <BoxAccent padding="md" key={b.brandId}>
                                <b className="block">{b.name}</b>

                                <div className="py-2">
                                    <span className="block text-sm text-gray-700">created: {toLocaleDateTimeString(b.createdAt)}</span>
                                    <span className="block text-sm text-gray-700">updated: {toLocaleDateTimeString(b.updatedAt)}</span>
                                </div>

                                <div className="grid grid-cols-2">
                                    <div className="col-span-1 flex justify-center">
                                        <Link to={`/user/brand/${b.brandId}`}>
                                            <ButtonMain
                                                text="Open"
                                                icon="arrow-up-right-from-square"
                                                size="sm"
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <ButtonDanger
                                            text="Delete"
                                            icon="trash"
                                            size="sm"
                                            onClick={() => deleteConfirm(
                                                b.brandId,
                                                "Brand deletion",
                                                `Do you want to delete the following brand: ${b.name}?`,
                                                deleteBrand
                                            )}
                                            isLoading={submitting}
                                            disabled={submitting}
                                        />
                                    </div>
                                </div>
                            </BoxAccent>
                        </div>
                    )
                }
            </div>

            <div ref={observerRef} style={{ display: (brands?.length > 0 ? 'block' : 'none') }}
                className="h-10 w-full flex items-center justify-center text-center">
                {fetching && <div className="py-4 font-bold">Loading products...</div>}
                {!hasMore && <div className="py-4 text-gray-500">You have loaded all elements.</div>}
            </div>
        </div>
    );
}