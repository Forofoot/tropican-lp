
export default function handler(req, res) {
    let infos =[ 
        {
            title : 'Qui sommes-nous ?',
            description : "Leste est le meilleur dispositif qui a pour but de créer des voyages et des activités entre grands-parents et petits-enfants pour renfoncer leurs formidable liens."
        },
        {
            title : 'Comment ?',
            description : "Leste vous permets d’organiser des voyages et des activités extraordinaires en France, entre grands-parents et petits-enfants tout en ayant la possibilité de les personnaliser."
        },
        {
            title : 'Avec qui ?',
            description : "Grâce à nos merveilleux partenaires et nos équipes prodigieuses nous vous accompagnons tout au long de vos voyages et/ou vos activités."
        }
        
    ]
    res.status(200).json(infos)
}
  
