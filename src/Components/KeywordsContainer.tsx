import type { LorcanaKeyword } from "../types/keywordsType"

type keywordsContainerProps = {
    keywords: LorcanaKeyword[]
}

export default function keywordsContainer({keywords} : keywordsContainerProps){
    
    const keywordsElements = keywords.map((keyword) => {
        return(
            <div className="keyword">
                {keyword}
            </div>
        )
    })

    return(
        <div className="keywords-container">
            {keywordsElements}
        </div>
    )
}