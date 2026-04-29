import type { LorcanaKeyword } from "../types/keywordsType"

type CardKeywordsContainerProps = {
    keywords: LorcanaKeyword[]
    inkColor?: string
}

export default function CardKeywordsContainer({keywords, inkColor} : CardKeywordsContainerProps){
    
    const keywordsElements = keywords.map((keyword) => {
        return(
            <span className="keyword" key={keyword}>
                {keyword}
            </span>
        )
    })

    return(
        <div className="keywords-container" data-ink-color={inkColor?.toLowerCase()}>
            {keywordsElements}
        </div>
    )
}
