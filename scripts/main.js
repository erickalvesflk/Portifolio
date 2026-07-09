import {BuildTools, HobbiesBuilder, SkillBuilder, AbilitiesBuilder, EducationBuilder} from "./ElementsBuilder.js"
const skills_address = "json/skills.json"
const my_data_address = "json/my_data.json"
const formation_address = "json/formation.json"

async function loadData(address) {
    const response = await fetch(address)
    const data = await response.json()
    
    return data
}

document.addEventListener("DOMContentLoaded", async () => {
    const skill_json = await loadData(skills_address)
    const mydata_json = await loadData(my_data_address)
    const formation_json = await loadData(formation_address)
    
    document.getElementById("old").innerText = BuildTools.calculatePeriod(mydata_json["born"])
    HobbiesBuilder.build(mydata_json["hobbies"])
    AbilitiesBuilder.build(mydata_json["other_abilities"])

    skill_json.forEach((skill, index) => {
        SkillBuilder.createSkill(
            skill["skill-name"],
            skill["level"],
            skill["date"],
            skill["projects_quant"],
            skill["images"],
            skill["details"]
        )
        console.log(`[Skill Loaded] - Skill-name: ${skill["skill-name"]}`)
    });

    formation_json.forEach((formation, index)=>{
        EducationBuilder.build(formation["institution"],formation["period"],formation["course"])
    })
})