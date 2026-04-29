export function getSynergySectionId(synergyName: string) {
    return `synergy-${synergyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;
}
