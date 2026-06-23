import { useEffect, useState, useRef, useCallback } from "react";
import { BoxAccent, BoxSecondary } from "../../components/ui/Boxes";
import ProductsService from "../../app/ProductsService";
import type { Product, ProductsResponse } from "../../core/types";
import { Link } from "react-router-dom";
import { ButtonDanger, ButtonMain } from "../../components/ui/Buttons";
import type { ConfirmationOptions } from "../../core/interfaces";
import { InputMain } from "../../components/ui/Inputs";
import { SelectMain } from "../../components/ui/Selects";
import { useNotificationStore } from "../../core/stores/notificationStore";
import { useConfirmationStore } from "../../core/stores/confirmationStore";
import { useUserStore } from "../../core/stores/userStore";

const ps = new ProductsService();

export default function ProductsPage() {
    const setMessage = useNotificationStore(state=>state.setMessage);
    const setMessageType = useNotificationStore(state=>state.setMessageType);
    const askConfirmation = useConfirmationStore(state=>state.askConfirmation);
    const [products, setProducts] = useState<Product[]>([]);
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [debounceKeyword, setDebounceKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const submitting = useUserStore(state=>state.submitting);

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timeID = setTimeout(() => {
            setDebounceKeyword(keyword);
            setSkip(0);
        }, 500);

        return () => clearTimeout(timeID);
    }, [keyword]);

    const getProducts = useCallback(async (currentSkip: number, currentKeyword: string) => {
        if (loading) return;
        setLoading(true);

        try {
            const response: ProductsResponse = await ps.getProducts(limit, currentSkip, currentKeyword);
            setTotal(response.total);
            
            if (currentSkip === 0) {
                setProducts(response.products);
                setHasMore(response.total > response.products.length);
            } else {
                setProducts(prevProducts => {
                    const updated = [...prevProducts, ...response.products];
                    setHasMore(response.total > updated.length);
                    return updated;
                });
            }
        } catch (err: any) {
            setMessage(err);
            setMessageType("danger");
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        getProducts(skip, debounceKeyword);
    }, [skip, debounceKeyword, getProducts]);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    setSkip((prevSkip) => prevSkip + limit);
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
    }, [loading, hasMore, limit]);

    const deleteConfirm = async (id: number, title: string) => {
        const msg = `Do you want to delete the following product: '${title}'?`;

        const confOptions: ConfirmationOptions = {
            title: "Product deletion",
            message: msg,
            messageType: "info",
            confirmText: "delete",
            confirmVariant: "danger",
            cancelVariant: "main",
            confirmIcon: "check",
            cancelIcon: "xmark",
            onConfirm: () => { deleteProduct(id) }
        } as const;

        askConfirmation(confOptions);
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await ps.deleteProduct(id);
            if (response.isDeleted)
                setProducts(prev => prev.filter(p => p.productId !== id));
            else throw "Something went wrong. Please, try again later!";
        } catch (err: any) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    return (
        <BoxSecondary rounded="rounded-none">
            <BoxAccent customClasses={["grid grid-cols-3 gap-2"]}>
                <div className="sm:col-span-2 col-span-3">
                    <b className="block mb-2">Keyword</b>
                    <InputMain
                        placeholder="keyword"
                        type="text"
                        onChange={e => setKeyword(e.target.value)}
                        value={keyword}
                        customClasses={['w-full']}
                    />
                </div>
                <div className="sm:col-span-1 col-span-3">
                    <b className="block mb-2">Limit</b>
                    <SelectMain
                        options={[12, 24, 48]}
                        onChange={e => setLimit(e.target.value)}
                        value={limit}
                        customClasses={['w-full']}
                    />
                </div>
            </BoxAccent>

            <Link to="/user/product">
                <ButtonMain
                    text="Add product"
                    customClasses={["mx-auto my-2 block"]}
                />
            </Link>

            {
                !loading && <b className="block text-center my-2">Number of products: {total}</b>
            }

            <div className="grid grid-cols-12">
                {products?.map((p, index) => (
                    <div key={`${p.productId}-${index}`} className="p-2 lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-12 text-center">
                        <BoxAccent>
                            <b className="block font-bold">{p.title}</b>
                            <Link to={`/user/product/${p.productId}`}>
                                <img className="py-3 mx-auto bg-white rounded my-3 w-full" 
                                src={p.images[0]?.path} alt={p.title} />
                            </Link>

                            <div className="grid grid-cols-2">
                                <div className="col-span-1 flex justify-center">
                                    <Link to={`/user/product/${p.productId}`}>
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
                                        onClick={() => deleteConfirm(p.productId, p.title)}
                                        disabled={submitting}
                                    />
                                </div>
                            </div>
                        </BoxAccent>
                    </div>
                ))}
            </div>

            <div ref={observerRef} style={{display:(products?.length > 0 ? 'block' : 'none')}} 
            className="h-10 w-full flex items-center justify-center">
                {loading && <div className="py-4 font-bold">Loading products...</div>}
                {!hasMore && products.length > 0 && <div className="py-4 text-gray-500">You have loaded all elements.</div>}
            </div>
        </BoxSecondary>
    );
}