export interface FilterQuestionBankI {
    category: string;
}

export interface QuestionBankI {
    is_selected: boolean;
    question_id: string;
    question: string;
    category: string;
    difficulty: string;
    language: string;
    published_at: string;
}

export interface QuestionBankLangI {
    language:string;
}