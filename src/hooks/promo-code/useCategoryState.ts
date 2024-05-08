import { useState } from "react";
import { useCircleListQuery } from "services/modules/circle";
import { usePlayListQuery } from "services/modules/play";
import { useGetQuizListQuery } from "services/modules/quiz";
import { useGetArticlesQuery } from "services/modules/article";
import { CircleReq } from "_interfaces/circle.interface";
import { PlayReq } from "_interfaces/play.interfaces";
import { GetQuizQuery } from "_interfaces/quiz.interfaces";
import { GetArticleQuery } from "_interfaces/article.interfaces";

export const useCategoryState = () => {
  const [selectAll, setSelectAll] = useState<string[]>([]);
  const [typeCategoryPromo, setTypeCategoryPromo] = useState<string[]>([]);
  const [checkedFeature, setCheckedFeature] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  return {
    selectAll,
    setSelectAll,
    typeCategoryPromo,
    setTypeCategoryPromo,
    checkedFeature,
    setCheckedFeature,
  };
};

export const useCircleSelection = (filterCircle: CircleReq) => {
  const dataCircle = useCircleListQuery(filterCircle).data;
  const isLoadingCircle = useCircleListQuery(filterCircle).isLoading;
  const [circleSelection, setCircleSelection] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  return {
    circleSelection,
    setCircleSelection,
    dataCircle,
    isLoadingCircle,
  };
};

export const usePlaySelection = (filterPlay: PlayReq) => {
  const dataPlay = usePlayListQuery(filterPlay).data;
  const isLoadingPlay = usePlayListQuery(filterPlay).isLoading;
  const [playSelection, setPlaySelection] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  return {
    playSelection,
    setPlaySelection,
    dataPlay,
    isLoadingPlay,
  };
};

export const useQuizSelection = (filterQuiz: GetQuizQuery) => {
  const dataQuiz = useGetQuizListQuery(filterQuiz).data;
  const isLoadingQuiz = useGetQuizListQuery(filterQuiz).isLoading;

  const [quizSelection, setQuizSelection] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  return {
    quizSelection,
    setQuizSelection,
    dataQuiz,
    isLoadingQuiz,
  };
};

export const useArticleSelection = (filterArticle: GetArticleQuery) => {
  const dataArticle = useGetArticlesQuery(filterArticle).data;
  const isLoadingArticle = useGetArticlesQuery(filterArticle).isLoading;
  const [articleSelection, setArticleSelection] = useState<
    {
      id: string;
      name: string;
      type: string;
    }[]
  >([]);
  return {
    articleSelection,
    setArticleSelection,
    dataArticle,
    isLoadingArticle,
  };
};
