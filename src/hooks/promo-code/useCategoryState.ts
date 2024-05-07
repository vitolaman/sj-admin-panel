import { useState } from "react";
import { useCircleListQuery } from "services/modules/circle";
import {
  useFilterArticle,
  useFilterCircle,
  useFilterPlay,
  useFilterQuiz,
} from "./useFilterState";
import { usePlayListQuery } from "services/modules/play";
import { useGetQuizListQuery } from "services/modules/quiz";
import { useGetArticlesQuery } from "services/modules/article";

export const useCircleSelection = () => {
  const { filterCircle, setFilterCircle } = useFilterCircle();
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
    filterCircle,
    setFilterCircle,
    dataCircle,
    isLoadingCircle,
  };
};

export const usePlaySelection = () => {
  const { filterPlay, setFilterPlay } = useFilterPlay();
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
    filterPlay,
    setFilterPlay,
    dataPlay,
    isLoadingPlay,
  };
};

export const useQuizSelection = () => {
  const { filterQuiz, setFilterQuiz } = useFilterQuiz();
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
    filterQuiz,
    setFilterQuiz,
    dataQuiz,
    isLoadingQuiz,
  };
};

export const useArticleSelection = () => {
  const { filterArticle, setFilterArticle } = useFilterArticle();
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
    filterArticle,
    setFilterArticle,
    dataArticle,
    isLoadingArticle,
  };
};
