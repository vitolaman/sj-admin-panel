export interface FilterQuestionBankI {
    category: string;
    language: string;
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