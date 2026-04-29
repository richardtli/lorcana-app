
type CardAbilitiesContainerProps = {
    abilities: string[]
    inkColor?: string
}

function parseAbility(ability: string) {
    const abilityMatch = ability.match(/^([A-Z0-9'!?,.\-\s]+):\s*(.*)$/);

    if (!abilityMatch) {
        return {
            abilityName: null,
            abilityDescription: ability,
        };
    }

    return {
        abilityName: abilityMatch[1],
        abilityDescription: abilityMatch[2],
    };
}

export default function CardAbilitiesContainer({abilities, inkColor} : CardAbilitiesContainerProps){
    
    const abilitiesElements = abilities.map((ability, index) => {
        const { abilityName, abilityDescription } = parseAbility(ability);

        return(
            <div className="ability" key={`${ability}-${index}`}>
                {abilityName ? (
                    <>
                        <span className="ability-name">{abilityName}</span>
                        <span className="ability-description">{abilityDescription}</span>
                    </>
                ) : (
                    abilityDescription
                )}
            </div>
        )
    })

    return(
        <div className="abilities-container" data-ink-color={inkColor?.toLowerCase()}>
            {abilitiesElements}
        </div>
    )
}
