import {SkillsCreator} from "./put_skills.js"

async function loadData(address) {
    const response = await fetch(address)
    const data = await response.json()
    
    return data
}

const skills_address = "json/skills.json"

document.addEventListener("DOMContentLoaded", async () => {
    let myJson = await loadData(skills_address)
    
    myJson.forEach((skill, index) => {
        SkillsCreator.createSkill(
            skill["skill-name"],
            skill["level"],
            skill["date"],
            skill["projects_quant"],
            skill["images"],
            skill["details"]
        )
        console.log(`[Skill Loaded] - Skill-name: ${skill["skill-name"]}`)
    });
})