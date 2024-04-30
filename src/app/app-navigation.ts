export const navigation = [
  {
    text: 'Tableau de bord',
    icon: 'datatrending',
    path:'dasboard'
    },
  {
    text: 'Employes',
    icon: 'group',
    items: [
      {
        text: 'Employes',
        path: '/listEmployer'
      }
    ]
  },
  {
    text: 'Table de Base',
    icon: 'folder',
    items: [
      {
        text: 'Controle Medicale',
        path: '/listAnalyse'
      },
      {
        text: 'Risques',
        path: '/listRisque'
      },
      {
        text: 'Postes',
        path: '/post'
      },
      // {
      //   text: 'Allergies',
      //   path: '/allergie'
      // },
      {
        text: 'Maladies Chronique',
        path: '/mchron'
      },
      {
        text: 'Vacssins',
        path: '/vacssin'
      }
    ]
  },
  {
    text: 'Profile',
    icon: 'card',
    path: '/profile'

  },
  {
    text: 'Comptes',
    icon: 'accountbox',
    path: '/create-accounte'
  }
];
