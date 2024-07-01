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


const useCreateReferralCode = () =>{ 
    const navigate = useNavigate();
    const [createReferral, createState] = useCreateReferralCodeMutation();
    const loadingCreate = createState.isLoading
    const validationSchema = yup.object().shape({
        name : yup.string().required("Name Cannot Empty"),
        seeds_tag : yup.string().required("seeds tag cannot empty").typeError("invalid seeds tag"),
        referral_code : yup.string().required("referral code cannot empty").typeError("invalid referral code")        
    })

    const defaultValues = {
        name: "",
        seeds_tag: "",
        referral_code: "",
        // notes: "",
    }

    const {
        handleSubmit,
        register,
        watch,
        formState : {errors}, 
        setValue,
        reset,
        control,
    } = useForm<ReferralCodeFormDataI>({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema),
        defaultValues,
      })
    

    const create = async (data: ReferralCodeFormDataI) =>{
        try{
            const payload = {
                ...data,
                name : data.name,
                seeds_tag : data.seeds_tag,
                referral_code : data.ref_code,
            };await createReferral(payload).unwrap();
            toast.success("Creating a referral code was successfull");
            navigate(-1);
        }catch(error){
            errorHandler(error)
        }
    }

    const handleCreate = handleSubmit(create)
    return {
        handleSubmit,
        handleCreate,
        register,
        watch,
        formState : {errors},
        setValue,
        reset,
        control,
        loadingCreate
    }   
}

export default useCreateReferralCode;