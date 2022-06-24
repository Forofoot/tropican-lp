// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let cards = [
    {
        name: 'Jérémy Ferrier',
        testimony: 'J’ai pu profiter d’un court et magnifique séjour avec mes petits-enfants. C’était super sympa les petits ont hâte qu’on reparte ensemble. On a adoré!',
    },
    {
        name: 'Marine Tourret',
        testimony: 'Nous avons passer un séjour exceptionnel grâce à Leste. Mes loulous et moi avons trouvé des centres d’intérets communs, ce que nous avions pas forcément auparavant.',
    }
  ]
  res.status(200).json(cards)
}
