
type abilitiesContainerProps = {
    abilities: string[]
}

export default function keywordsContainer({abilities} : abilitiesContainerProps){
    
    const abilitiesElements = abilities.map((ability) => {
        return(
            <div className="ability">
                {ability}
            </div>
        )
    })

    return(
        <div className="abilities-container">
            {abilitiesElements}
        </div>
    )
}