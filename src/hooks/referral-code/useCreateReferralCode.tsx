import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ReferralCodeFormDataI } from "_interfaces/referral-code.interface";
import { PiCornersOutBold } from "react-icons/pi";
import ReferralCode from "pages/referral-code/index.page";
import { errorHandler } from "services/errorHandler";
import { useCreateReferralCodeMutation } from "services/modules/referral-code";
import { toast } from "react-toastify";
import { error } from "console";


const useCreateReferralCode = () =>{ 
    const navigate = useNavigate();
    const [createReferral, createState] = useCreateReferralCodeMutation();
    const loadingCreate = createState.isLoading
    const validationSchema = yup.object().shape({
        name : yup.string().required("Name Cannot Empty"),
        seeds_tag : yup.string().required("seeds tag cannot empty").typeError("invalid seeds tag"),
        phone_number : yup.string().required("Phone Number Cannot Empty").typeError("invalid number phone"),
        ref_code : yup.string().required("referral code cannot empty").typeError("invalid referral code"),
        notes : yup.string().required()        
    })

    const defaultValues = {
        name: "",
        phone_number :"+62",
        seeds_tag: "",
        ref_code: "",
        notes: "",
    }

    const {
        handleSubmit,
        register,
        formState : {errors}, 
        control,
        trigger,
    } = useForm<ReferralCodeFormDataI>({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema),
        defaultValues,
      })
    

    const create = async (data: ReferralCodeFormDataI) =>{
        try{
            // const payload = {
            //     ...data,
            //     name : data.name,
            //     phone_number : data.phone_number,
            //     seeds_tag : data.seeds_tag,
            //     referral_code : data.ref_code,
            //     notes : data.notes
            // };
            await createReferral(data).unwrap();
            toast.success("Creating a referral code was successfull");
            navigate(-1);
        }catch(error){
            errorHandler(error)
        }
    }

    const handleCreate = handleSubmit(create)
    return {
        handleCreate,
        register,
        errors,
        control,
        loadingCreate,
        trigger
    }   
}

export default useCreateReferralCode;