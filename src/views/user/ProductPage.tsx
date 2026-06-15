import { useEffect, useMemo, useState } from "react";
import type { ProductFormData } from "../../core/types";
import { InputMain } from "../../components/ui/Inputs";
import { BoxSecondary } from "../../components/ui/Boxes";
import TagInput from "../../components/ui/TagInput";
import ProductsService from "../../app/ProductsService";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonMain } from "../../components/ui/Buttons";
import { handleChange, validateForm } from "../../core/utils";
import { productValidationSchema } from "../../core/ValidationSchemes";
import { useNotificationStore } from "../../core/stores/notificationStore";
import { useUserStore } from "../../core/stores/userStore";

export default function ProductPage() {
    const ps = useMemo(()=>new ProductsService(), []);
    const submitting = useUserStore(state=>state.submitting);
    const navigate = useNavigate();
    const {id} = useParams();
    
    const [productData, setProductData] = useState<ProductFormData>({
        brandId: 1,
        title: "",
        description: "",
        price: 0,
        stock: 0,
        discountPercentage: 0,
        tags: []
    });
    const [errors, setErrors] = useState<Record<keyof ProductFormData,any>>({
        brandId: 0,
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        tags: ""
    });
    
    const setMessage = useNotificationStore(state=>state.setMessage);
    const setMessageType = useNotificationStore(state=>state.setMessageType);

    const addProduct = async () => {
        try {
            const errs = validateForm(productData, productValidationSchema);
            const isUpdate = id ? true : false;

            if(!errs.passed) {
                throw errs.errors;
            }

            const product = !isUpdate ? await ps.addProduct(productData) 
            : await ps.updateProduct(parseInt(id as string), productData);

            setMessage(`You have successfully ${isUpdate ? 'updated' : 'added'} your product!`);
            setMessageType("success");
            
            if(!isUpdate) navigate(`/product/${product.productId}`);
        } catch (err: any) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    const getProduct = async ()=> {
        if(!id) return;

        try {
            const response = await ps.getProduct(parseInt(id as string));
            setProductData(response);
        } catch (err: any) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    useEffect(()=> {
        getProduct();
    }, []);

    return (
        <>
            <h1 className="text-3xl my-3 text-center text-main">Add product</h1>

            <form
                className="grid grid-cols-2 gap-5 text-center"
                onSubmit={(e) => { e.preventDefault(); addProduct(); }}
            >
                <BoxSecondary customClasses={['lg:col-span-1', 'col-span-2', 'flex', 'flex-col', 'gap-4']}>
                    <h2 className="text-xl font-bold text-main mb-2">Basic Info</h2>

                    <div>
                        <b className="block text-main mb-1">Brand</b>
                        <b className="block text-danger">{errors.brandId||""}</b>

                        <InputMain
                            type="text" customClasses={['w-[90%]']} placeholder="Product brand"
                            value={productData.brandId} name="brand"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>

                    <div>
                        <b className="block text-main mb-1">Product title</b>
                        <b className="block text-danger">{errors.title||""}</b>

                        <InputMain
                            type="text" customClasses={['w-[90%]']} placeholder="Product title"
                            value={productData.title} name="title"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>

                    <div>
                        <b className="block text-main mb-1">Description</b>
                        <b className="block text-danger">{errors.description||""}</b>

                        <InputMain
                            type="textarea" customClasses={['w-[90%] min-h-[130px]']} placeholder="Product description"
                            value={productData.description} name="description"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>
                </BoxSecondary>

                <BoxSecondary customClasses={['lg:col-span-1', 'col-span-2', 'flex', 'flex-col', 'gap-4']}>
                    <h2 className="text-xl font-bold text-main mb-2">Inventory & Pricing</h2>

                    <div>
                        <b className="block text-main mb-1">Price ($)</b>
                        <b className="block text-danger">{errors.price||""}</b>

                        <InputMain
                            type="number" customClasses={['w-[90%]']} placeholder="Price"
                            value={productData.price} name="price"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>

                    <div>
                        <b className="block text-main mb-1">Discount (%)</b>
                        <b className="block text-danger">{errors.discountPercentage||""}</b>

                        <InputMain
                            type="number" customClasses={['w-[90%]']} placeholder="Discount percentage"
                            value={productData.discountPercentage} name="discountPercentage"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>

                    <div>
                        <b className="block text-main mb-1">Stock</b>
                        <b className="block text-danger">{errors.stock||""}</b>

                        <InputMain
                            type="number" customClasses={['w-[90%]']} placeholder="Available stock"
                            value={productData.stock} name="stock"
                            onChange={(e:any)=>handleChange(e, setProductData, setErrors, productValidationSchema)}
                        />
                    </div>

                    <div>
                        <b className="block text-main mb-1">Tags</b>
                        <b className="block text-danger">{errors.tags||""}</b>

                        {/* <TagInput
                            tags={productData?.tags}
                            addTag={(tag: string) =>
                                setProductData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
                            }
                            removeTag={(index: number) =>
                                setProductData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))
                            }
                            placeholder="comma or enter"
                        /> */}
                    </div>
                </BoxSecondary>

                <div className="col-span-2 mt-4 text-center">
                    <ButtonMain
                        text="Save"
                        icon="save"
                        isLoading={submitting}
                        disabled={submitting}
                    />
                </div>
            </form>
        </>
    );
}