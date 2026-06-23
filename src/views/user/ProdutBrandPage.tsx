import { useNavigate, useParams } from "react-router-dom";
import { BoxSecondary } from "../../components/ui/Boxes";
import { useMemo, useState } from "react";
import type { ProductBrandFormData } from "../../core/types";
import { InputMain } from "../../components/ui/Inputs";
import { handleChange, validateField, validateForm } from "../../core/utils";
import { brandValidationScheme } from "../../core/ValidationSchemes";
import { ButtonMain } from "../../components/ui/Buttons";
import ProductBrandService from "../../app/ProductBrandService";
import { useUserStore } from "../../core/stores/userStore";
import { useNotificationStore } from "../../core/stores/notificationStore";

export default function ProductBrandPage() {
    const { brandId } = useParams();
    const pbs = useMemo(() => new ProductBrandService(), []);
    const submitting = useUserStore(state => state.submitting);
    const setMessage = useNotificationStore(state=>state.setMessage);
        const setMessageType = useNotificationStore(state=>state.setMessageType);
    const navigate = useNavigate();

    const [brandData, setBrandData] = useState<ProductBrandFormData>({
        name: "",
        description: ""
    });

    const [errors, setErrors] = useState<Record<keyof ProductBrandFormData, null | string>>({
        name: null,
        description: null
    });

    const addBrand = async () => {
        try {
            const errs = validateForm(brandData, brandValidationScheme);
            const isUpdate = brandId ? true : false;

            if (!errs.passed) {
                throw errs.errors;
            }

            const brand = !isUpdate ? await pbs.createBrand(brandData)
                : await pbs.updateBrand(parseInt(brandId as string), brandData);

            setMessage(`You have successfully ${isUpdate ? 'updated' : 'added'} your product!`);
            setMessageType("success");

            if (!isUpdate) navigate(`/product/${brand.brandId}`);
        } catch (err: any) {
            setMessage(err);
            setMessageType("danger");
        }
    };

    return (
        <>
            <h1 className="text-3xl my-3 text-center text-main">Add brand</h1>

            <form onSubmit={e=>{ e.preventDefault(); addBrand(); }} className="grid grid-cols-2 gap-5 text-center">
                <BoxSecondary customClasses={['lg:col-span-1', 'col-span-2', 'flex', 'flex-col', 'gap-4']}>
                    <div>
                        <b className="block text-main mb-1">Brand</b>
                        <b className="block text-danger">{errors.name || ""}</b>

                        <InputMain
                            type="text" customClasses={['w-[90%]']} placeholder="Product brand"
                            value={brandData.name} name="name"
                            onChange={(e: any) => handleChange(e, setBrandData, setErrors, brandValidationScheme)}
                        />
                    </div>
                </BoxSecondary>

                <BoxSecondary customClasses={['lg:col-span-1', 'col-span-2', 'flex', 'flex-col', 'gap-4']}>
                    <div>
                        <b className="block text-main mb-1">Description</b>
                        <b className="block text-danger">{errors.description || ""}</b>

                        <InputMain
                            type="textarea" customClasses={['w-[90%]']} placeholder="Product brand"
                            value={brandData.description} name="description"
                            onChange={(e: any) => handleChange(e, setBrandData, setErrors, brandValidationScheme)}
                        />
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