import { GetArticleQuery } from '_interfaces/article.interfaces';
import { CircleReq } from '_interfaces/circle.interface';
import { PlayReq } from '_interfaces/play.interfaces';
import { GetQuizQuery } from '_interfaces/quiz.interfaces';
import { GetReferralCodeQuery } from '_interfaces/referral-code.interface';
import { useState } from 'react';

export const useFilterRef = () => {
    const [paramsRef, setParamsRef] = useState<GetReferralCodeQuery>({
        page: 1,
        limit: 10,
        search: "",
      });
return{paramsRef, setParamsRef}
}

export const useFilterCircle=()=>{
    const [filterCircle, setFilterCircle] = useState<CircleReq>({
        search: "",
        limit: 10,
        page: 1,
        sort_by: "created_at",
        order: "desc",
        type: "",
        total_member_from: "",
        total_member_to: "",
        total_post_from: "",
        total_post_to: "",
        total_like_from: "",
        total_like_to: "",
        total_share_from: "",
        total_share_to: "",
        created_at_from: "",
        created_at_to: "",
      });
      return{filterCircle, setFilterCircle}
}

export const useFilterPlay=()=>{
  const [filterPlay, setFilterPlay] = useState<PlayReq>({
    search: "",
    type: "",
    status: "",
    page: 1,
    limit: 10,
  });
  return {filterPlay, setFilterPlay}
}

export const useFilterArticle=()=>{
  const [filterArticle, setFilterArticle] = useState<GetArticleQuery>({
    page: 1,
    limit: 10,
    filter_status: "PUBLISHED",
    search_title: "",
  });
  return {filterArticle, setFilterArticle}
}

export const useFilterQuiz=()=>{
  const [filterQuiz, setFilterQuiz] = useState<GetQuizQuery>({
    page: 1,
    limit: 10,
    search: "",
    category: "",
  });
  return{filterQuiz,setFilterQuiz}
}