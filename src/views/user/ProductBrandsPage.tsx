import { useEffect, useMemo, useState } from "react";
import { useNotificationStore } from "../../core/stores/notificationStore";
import type { BrandSearchParams, ProductBrand } from "../../core/types";
import { BoxAccent } from "../../components/ui/Boxes";
import { InputMain } from "../../components/ui/Inputs";
import { SelectMain } from "../../components/ui/Selects";
import { Link } from "react-router-dom";
import { ButtonDanger, ButtonMain } from "../../components/ui/Buttons";
import ProductBrandService from "../../app/ProductBrandService";
import { deleteConfirm, toLocaleDateTimeString } from "../../core/utils";
import { useUserStore } from "../../core/stores/userStore";

export default function ProductBrandsPage() {
    const setMessage = useNotificationStore(state => state.setMessage);
    const submitting = useUserStore(state => state.submitting);
    const pbs = useMemo(() => new ProductBrandService(), []);
    const setMessageType = useNotificationStore(state => state.setMessageType);
    const [brands, setBrands] = useState<ProductBrand[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [searchParams, setSearchParams] = useState<BrandSearchParams>({
        limit: 12,
        skip: 0,
        orderBy: "-",
        name: ""
    });

    const searchBrands = async () => {
        try {
            const response = await pbs.search(searchParams);
            setBrands(response.brands);
            setTotal(response.total);
        } catch (err: unknown) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    const deleteBrand = async (brandId:number)=> {
        try {
            await pbs.deleteBrand(brandId);
            setBrands(brands.filter(b=>b.brandId !== brandId));
        } catch (err: unknown) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    useEffect(() => {
        searchBrands();
    }, []);

    return (
        <>
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

            <div className="grid grid-cols-12 gap-2">
                {
                    brands.map(b =>
                        <div className="md:col-span-4 sm:col-span-6 col-span-12 p-2 text-center">
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
                                            onClick={()=>deleteConfirm(
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
        </>
    );
}