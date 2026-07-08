// Informar titulo, niveis, habilidades e imagem
/**
 <div class="skill">
    <div class="skill-container">
    <div>
        <h2>HTML5 e CSS3</h2>
        <img src="src1" />
        <img src="src2" />
        </div>
            <ul>
            <li><span>Nível:</span> Básico - <nivel> </li>
            <li><span>Periodo utilizando:</span> <periodo> ></li>
            <li><span>Projetos:</span> <projetos_quant></li>
        </ul>
    </div>
    <details>
        <summary>Meu Histórico</summary>
        <ul>
        </ul>
    </details>
 </div>
 */

const skills_article = document.getElementById("skills-container") 

export class SkillsCreator {
    /**
     *  Classe contrutora de skills
     */

    static createSkill(skill_name, level, period, projects_quant,images, descs){
        /**
         * Método que constroi uma skil com os 
         * @param {string} skill_name - Nome da Skill
         * @param {level} level - Nivel da Skill : Básico - Intermediário - Avançado
         * @param {string} period - Tempo dessa skill
         * @param {string[]} images - Array com os endereços (em string) das imagens
         * @param {string[]} desc - Array com a especialização de conhecimentos (em string)
         */

        let skill_div = document.createElement("div")
        skill_div.classList.add("skill")
        
        let skill_container_div = document.createElement("div")
        skill_container_div.classList.add("skill-container")
        skill_div.appendChild(skill_container_div)

        // CRIANDO ELEMENTOS INTERNOS DO SKILL_CONTAINER
        
        let title_div = document.createElement("div")
        skill_container_div.appendChild(title_div)
        title_div.innerHTML += `<h2>${skill_name}</h2>`

        images.forEach((image, index)=>{
            title_div.innerHTML += `<img src="${image}"/>`
        })

        let info_div = document.createElement("ul")
        skill_container_div.appendChild(info_div)
        info_div.innerHTML += `<li><span>Nível: </span>${level}</li>`
        info_div.innerHTML += `<li><span>Periodo: </span>${period}</li>`
        info_div.innerHTML += `<li><span>Projetos: </span>${projects_quant}</li>`

        // CRIANDO DETAILS
        let details_div = document.createElement("details")
        details_div.toggleAttribute('open')
        details_div.innerHTML += `<summary>Conhecimentos...</summary>`
        skill_div.appendChild(details_div)

        if(descs){
            let details_list = document.createElement("ul")
            console.log(descs)
            descs.forEach((desc, index) => {
                details_list.innerHTML += `<li>${desc}</li>`
            })

            details_div.appendChild(details_list)
        }

        skills_article.appendChild(skill_div)
    }
}