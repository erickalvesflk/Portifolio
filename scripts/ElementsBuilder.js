/**
 * @file - Group of classes, which have helpful methods for create new elements for the website
*/
const hobbies_div = document.getElementById("hobbies-div") 
const abilities_div = document.getElementById("other-abilities-div") 
const skills_container = document.getElementById("skills-container") 
const education_container = document.getElementById("education-container") 
const education_bar = document.getElementById("education-bar") 
const projects_container = document.getElementById("projects-container") 

/**
 * @classdesc - Class with helpful methods for building elements
 */
export class BuildTools {

    /**
     * Returns a formatted period.
     * @param {[number, number?, number?]} date - array with year and month?
     * @returns {string}
     */
    static calculatePeriod(date){
        if(!date) return '?';

        // (*) month -> milisseconds
        const CONVERTER = 30 * 24 * 3600 * 1000
        let now = Date.now()
        let year = date[0];
        let month = date[1] !== undefined ? date[1]-1 : 0; // Remova "- 1" se sua array já for base-0
        let day = date[2] !== undefined ? date[2] : 1; 

        let skill_date = Date.UTC(year, month, day);
        let delta_date = now - skill_date; // Resultado em milissegundos

        if(date[2]){
            // DETERMINED MODE ACTIVATED
            if(delta_date <= 1 * CONVERTER / 4){
                // less then 1 weak
                let day_ago = Math.floor(delta_date / (24 * 3600 * 1000));
                return `${day_ago} dia${day_ago===1 ? '' : 's'}`
            }
            if(delta_date <= 1 * CONVERTER){
                // less then 1 month
                let weak_ago = Math.floor(delta_date / (24 * 3600 * 1000)/7);
                return `${weak_ago} semana${weak_ago===1 ? '' : 's'}`
            }
            if(delta_date <= 12 * CONVERTER){
                // less then 1 year
                let month_ago = Math.floor(delta_date / CONVERTER);
                return `${month_ago} mes${month_ago===1 ? '' : 'es'}`
            }
        }else{
            // DETERMINED MODE NOT ACTIVATED
            if(delta_date <= 6 * CONVERTER){
                // Less then 6 months
                return "3 meses"
            }
            if(delta_date <= 12 * CONVERTER){
                // less then 1 year
                return "6 meses"
            }
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

        skills_container.appendChild(skill_div)

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

/** 
 * @classdesc - Constructor class for the section formation 
 * */
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
        education_container.appendChild(formation_div)
        education_bar.appendChild(document.createElement("div"))

        console.log(`[formation loaded] - Course name: ${course}`)
    }
}



/**
 * <div class="project">
 *    <img src="">
 *    <div>
 *      <h3><Nome Projeto></h3>
 *      <p><Data></p>
 *    </div>
 *    <div class="project-container">
 *      <ul>
 *          <li><ferramenta-1></li>
 *          <li><ferramenta-2></li>
 *           ...
 *          <li><ferramenta-n></li>
 *      </ul>
 *      <a></a>
 *      <p><descrição></p>
 *    </div>
 * </div>
*/
/** 
 * @classdesc - Constructor class for the section projects
 * */
export class ProjectBuilder extends BuildTools{

    /**
     * Build a new project for the section projects
     * @param {string} project_name - Project name
     * @param {[number,number?]} date - Date of the project: [year, month?]
     * @param {string} desc - Description of the project
     * @param {[string]} tools - Tools used in the project
     * @param {[string]?} link - Links for see the project
     * @param {string?} img - Img source
     */
    static build(project_name, date, desc, tools, link, img){
        let project_div = document.createElement("div")
        project_div.classList.add("project")
        
        let project_container = document.createElement("div")
        project_container.classList.add("project-container")

        if(img) project_div.innerHTML += `<img src="${img}">`;

        let title_div = document.createElement("div")
        title_div.classList.add("project__title-div")
        title_div.innerHTML += `<h3>${project_name}</h3>`
        title_div.innerHTML += `<p>há ${this.calculatePeriod(date)} atrás</p>`

        let tools_list = document.createElement("ul")
        tools.forEach((tool) => {
            tools_list.innerHTML += `<li>${tool}</li>`
        })

        project_container.appendChild(title_div)
        project_container.appendChild(tools_list)
        
        project_container.innerHTML += `<p>${desc}</p>`

        if (link){
            project_container.innerHTML += `<a href="${link}" target="_blank" >Veja o projeto</a>`
        }

        project_div.appendChild(project_container)
        projects_container.appendChild(project_div)
        console.log(`[Project Loaded] - Project name: ${project_name}`)
    }

}