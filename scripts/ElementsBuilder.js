/**
 * @file - Group of classes, which have helpful methods for create new elements for the website
*/
const hobbies_div = document.getElementById("hobbies-div") 
const abilities_div = document.getElementById("other-abilities-div") 
const skills_article = document.getElementById("skills-container") 
const education_article = document.getElementById("education-container") 
const education_bar = document.getElementById("education-bar") 

/**
 * @classdesc - Class with helpful methods for building elements
 */
export class BuildTools {

    /**
     * Returns a formatted period.
     * @param {[string, string]} date - array with year and month?
     * @returns {string}
     */
    static calculatePeriod(date){
        if(!date) return '?';

        // (*) month -> milisseconds
        const CONVERTER = 30 * 24 * 3600 * 1000
        let now = Date.now()
        let skill_date = Date.UTC(date[0],date[1] ? date[1] : 0)
        let delta_date = now - skill_date

        if(delta_date <= 6 * CONVERTER){
            // Less then 6 months
            return "3 meses"
        }
        if(delta_date <= 12 * CONVERTER){
            // less then 1 year
            return "6 meses"
        }
        // More than 1 year
        let date_year_format = Math.floor(delta_date / CONVERTER / 12)
        return `${date_year_format} ${date_year_format > 1 ? 'anos' : 'ano'}`
    }
}

/** @classdesc - Constructor class for hobbies div */
export class HobbiesBuilder {
    /**
     * build a list of hobbies
     * @param {string[]} hobbie_list - array with the hobbies
     */
    static build(hobbie_list) {
        if(hobbie_list){
            hobbie_list.forEach((hobbie,index) => {
                if(hobbie){
                    let new_hobbie = document.createElement("p")

                    new_hobbie.classList.add("hobbie-p")
                    new_hobbie.innerText = hobbie

                    console.log(`[hobbie loaded] - Hobbie Name: ${hobbie}`)
                    hobbies_div.appendChild(new_hobbie)                
                }
            });
        }
    }
}

/** @classdesc - Constructor class for abilities div */
export class AbilitiesBuilder {
    /**
     * build a list of abilities
     * @param {string[]} hobbie_list - array with the abilities
     */
    static build(hobbie_list) {
        if(hobbie_list){
            hobbie_list.forEach((hobbie,index) => {
                if(hobbie){
                    let new_hobbie = document.createElement("p")

                    new_hobbie.classList.add("other_ability-p")
                    new_hobbie.innerText = hobbie

                    console.log(`[Other ability loaded] - Ability name: ${hobbie}`)
                    abilities_div .appendChild(new_hobbie)                
                }
            });
        }
    }
}

/**
 * 
 * <div class="skill">
 *    <div class="skill-container">
 *        <div>
 *            <h2>HTML5 e CSS3</h2>
 *            <img src="src1" />
 *            <img src="src2" />
 *        </div>
 *        <ul>
 *            <li><span>Nível:</span> Básico - <nivel> </li>
 *            <li><span>Periodo utilizando:</span> <periodo> ></li>
 *            <li><span>Projetos:</span> <projetos_quant></li>
 *        </ul>
 *    </div>
 *    <details>
 *        <summary>Meu Histórico</summary>
 *        <ul>
 *        </ul>
 *    </details>
 * </div>
*/

/** @classdesc - Constructor class for the section skills */
export class SkillBuilder extends BuildTools {

    /**
     * Method, which creates a skill for the section-skills
     * @param {string} skill_name - Name of the skill
     * @param {level} level - Level of the skill: Básico - Intermediário - Avançado
     * @param {string} period - Period of the skill
     * @param {string[]} images - Array with the images sources
     * @param {string[]} descs - Array whith the details
     * 
     */
    static createSkill(skill_name, level, period, projects_quant,images, descs){

        let skill_div = document.createElement("div")
        skill_div.classList.add("skill")
        
        let skill_container_div = document.createElement("div")
        skill_container_div.classList.add("skill-container")
        skill_div.appendChild(skill_container_div)

        // CREATING ELEMENTS FOR SKILL-CONTAINER
        
        let title_div = document.createElement("div")
        skill_container_div.appendChild(title_div)
        title_div.innerHTML += `<h2>${skill_name}</h2>`

        images.forEach((image, index)=>{
            title_div.innerHTML += `<img src="${image}"/>`
        })

        let info_div = document.createElement("ul")
        skill_container_div.appendChild(info_div)
        info_div.innerHTML += `<li><span>Nível: </span>${level}</li>`
        info_div.innerHTML += `<li><span>Periodo: </span>${this.calculatePeriod(period)}</li>`
        info_div.innerHTML += `<li><span>Projetos: </span>${projects_quant}</li>`

        // CREATING DETAILS
        let details_div = document.createElement("details")
        details_div.innerHTML += `<summary>Conhecimentos...</summary>`
        skill_div.appendChild(details_div)

        if(descs){
            let details_list = document.createElement("ul")
            descs.forEach((desc, index) => {
                details_list.innerHTML += `<li>${desc}</li>`
            })

            details_div.appendChild(details_list)
        }

        skills_article.appendChild(skill_div)

        // CRIEATING EVENT FOR WHEN CLICK, OPEN DETAILS
        skill_div.addEventListener("click",()=>{
            details_div.toggleAttribute("open")
        })
    }
}

/**
 * <div class="formation">
 *    <h3><Nome Curso></h3>
 *    <ul>
 *        <li><span>Instituição:</span> Básico - <nivel> </li>
 *        <li><periodo 0> - <periodo 1> </li>
 *    </ul>
 * </div>
*/

/** @classdesc - Constructor class for the section formation */
export class EducationBuilder {
    /**
     * build an educaton div
     * @param {string} institution_name - Name of the institution
     * @param {[number, number]} period - array with the start and the end of the formation
     * @param {string} course - Course name
     */
    static build(institution_name, period, course) {
        let formation_div = document.createElement("div")
        formation_div.classList.add("formation")
        let list = document.createElement("ul")
        formation_div.innerHTML += `<h3>${course}</h3>`
        list.innerHTML += `<li><span>Instituição: </span>${institution_name}</li>`
        list.innerHTML += `<li>${period[0]} - ${period[1]}</li>`
        
        formation_div.appendChild(list)
        education_article.appendChild(formation_div)
        education_bar.appendChild(document.createElement("div"))

        console.log(`[formation loaded] - Course name: ${course}`)

    }
}