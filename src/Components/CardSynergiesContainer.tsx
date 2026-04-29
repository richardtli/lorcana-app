import { getSynergySectionId } from "../utils/synergySectionId"

type CardSynergiesContainerProps = {
    synergyNames: string[]
    inkColor?: string
}

export default function CardSynergiesContainer({synergyNames, inkColor} : CardSynergiesContainerProps){
    const synergyNameElements = synergyNames.map((synergyName) => (
        <li className="card-synergy-name" key={synergyName}>
            <a className="card-synergy-link" href={`#${getSynergySectionId(synergyName)}`}>
                {synergyName}
            </a>
        </li>
    ))

    return(
        <section className="card-synergy-names-container" data-ink-color={inkColor?.toLowerCase()}>
            <p className="card-synergy-names-heading">Synergies</p>
            <ul className="card-synergy-names-list">
                {synergyNameElements}
            </ul>
        </section>
    )
}
