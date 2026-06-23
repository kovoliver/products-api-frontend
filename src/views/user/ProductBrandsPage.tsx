import { useState } from "react";
import { useConfirmationStore } from "../../core/stores/confirmationStore";
import { useNotificationStore } from "../../core/stores/notificationStore";
import type { BrandSearchParams, ProductBrand } from "../../core/types";
import { BoxAccent, BoxSecondary } from "../../components/ui/Boxes";
import { InputMain } from "../../components/ui/Inputs";
import { SelectMain } from "../../components/ui/Selects";
import { Link } from "react-router-dom";
import { ButtonMain } from "../../components/ui/Buttons";

export default function ProductBrandsPage() {
    const setMessage = useNotificationStore(state => state.setMessage);
    const setMessageType = useNotificationStore(state => state.setMessageType);
    const askConfirmation = useConfirmationStore(state => state.askConfirmation);
    const [brands, setBrands] = useState<ProductBrand[]>([]);
    const [searchParams, setSearchParams] = useState<BrandSearchParams>({
        limit: 12,
        skip: 0,
        orderBy: "-",
        name: ""
    });

    return (
        <>
            <h1 className="text-3xl my-3 text-center text-main">Search brand</h1>


            <BoxAccent customClasses={["grid grid-cols-12 gap-2"]}>
                <div className="sm:col-span-6 col-span-12 ">
                    <b className="block mb-2">Brand name</b>
                    <InputMain
                        placeholder="brand name"
                        type="text"
                        onChange={e => setSearchParams({...searchParams, name:e.target.value})}
                        value={searchParams.name}
                        customClasses={['w-full']}
                    />
                </div>
                <div className="sm:col-span-3 col-span-12">
                    <b className="block mb-2">Limit</b>
                    <SelectMain
                        options={[12, 24, 48]}
                        onChange={e => setSearchParams({...searchParams, limit:parseInt(e.target.value)})}
                        value={searchParams.limit}
                        customClasses={['w-full']}
                    />
                </div>

                <div className="sm:col-span-3 col-span-12">
                    <b className="block mb-2">Order by name</b>
                    <SelectMain
                        options={["-", "asc", "desc"]}
                        onChange={e => setSearchParams({...searchParams, orderBy:e.target.value})}
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
        </>
    );
}