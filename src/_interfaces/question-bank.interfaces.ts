export interface FilterQuestionBankI {
    data: keyof QuestionData;
}

interface Option {
    id: number;
    option: string;
}

interface LanguageData {
    question: string;
    options: {
        option_1: Option;
        option_2: Option;
        option_3: Option;
        option_4: Option;
    };
    description: string;
}

export interface QuestionData {
    en: LanguageData;
    id: LanguageData;
}

export interface QuestionBankI {
    id: string;
    difficulty: string;
    data: QuestionData;
    category: string;
    created_at: string;
    updated_at: string;
}

export interface GetQuestionBankQuery {
    page: number;
    limit: number;
    difficulty: string;
    search: string;
    category:string;
}

export interface Meta {
    total:number;
    current_page: number;
    limit: number;
    total_page: number;
}

export interface QuestionBankRes {
    data: QuestionBankI[];
    metadata: Meta
}