import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorHandler } from "services/errorHandler";
import {
  EditArticleFormI,
  EditArticlePayload,
  Tag,
} from "_interfaces/article.interfaces";
import { uploadFile } from "services/modules/file";
import { useAppSelector } from "store";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
} from "services/modules/article";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUpsertArticleForm = (id?: number) => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [udpateArticle, updateState] = useEditArticleMutation();
  const [createArticle, createState] = useCreateArticleMutation();
  const loadingUpsert = createState.isLoading || updateState.isLoading;
  const schema = yup.object({
    title: yup.string().required(),
    metaTitle: yup.string().required().max(160),
    metaDescription: yup.string().required().min(10),
    content: yup.string().required().min(10),
  }).required();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    setFocus,
    watch,
    setValue,
  } = useForm<EditArticleFormI>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      status: "PUBLISED",
    }
  });

  const update = async (data: EditArticleFormI) => {
    try {
      const assets: Tag[] = data.assets.map((item) => ({
        id: item.value,
        name: item.label,
      }));
      const circles: Tag[] = data.circles.map((item) => ({
        id: item.value,
        name: item.label,
      }));
      const peoples: Tag[] = data.peoples.map((item) => ({
        id: item.value,
        name: item.label,
      }));

      const payload: EditArticlePayload = {
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        content: data.content,
        status: data.status,
        assets: assets,
        circles: circles,
        category: data.category,
        language: data.language,
        peoples: peoples,
      };
      if (data.imageUrl && data.imageUrl[0]) {
        const imageUrl = await uploadFile(accessToken!, data.imageUrl[0]);
        payload.imageUrl = imageUrl;
        payload.source_image = imageUrl;
      }
      await udpateArticle({ id: id!, body: payload }).unwrap();
      toast("Create article success");
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const create = async (data: EditArticleFormI) => {
    try {
      const assets: Tag[] = data.assets.map((item) => ({
        id: item.value,
        name: item.label,
      }));
      const circles: Tag[] = data.circles.map((item) => ({
        id: item.value,
        name: item.label,
      }));
      const peoples: Tag[] = data.peoples.map((item) => ({
        id: item.value,
        name: item.label,
      }));

      let imageUrl = "";
      if (data.imageUrl && data.imageUrl[0]) {
        imageUrl = await uploadFile(accessToken!, data.imageUrl[0]);
      } else {
        imageUrl = "";
      }
      const payload: EditArticlePayload = {
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        content: data.content,
        imageUrl: imageUrl,
        source_image: imageUrl,
        author: "",
        status: data.status,
        publicationDate:
          data.status !== "SCHEDULED"
            ? new Date().toISOString()
            : `${data.scheduled_at}:00.000Z`,
        created_at: "",
        updated_at: "",
        assets: assets,
        circles: circles,
        category: data.category,
        language: data.language,
        peoples: peoples,
      };
      await createArticle(payload).unwrap();
      toast("Create article success");
      navigate(-1);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUpdate = handleSubmit(update);
  const handleCreate = handleSubmit(create);

  return {
    handleCreate,
    handleUpdate,
    register,
    errors,
    setFocus,
    reset,
    control,
    loadingUpsert,
    watch,
    setValue,
  };
};

export default useUpsertArticleForm;
