const Category = require("../models/category");
const Article = require("../models/article");

module.exports = app => {
  app.get("/api/seedDb", (req, res) => {
    var categories = [
      {
        _id: "5cd67e886a2d062fe06d0144",
        value: "Javascript",
        nodes: [
          {
            _id: "5cd67e885b7968371129b129",
            value: "Node JS"
          },
          {
            _id: "5cd67e8864a9d1e22b4889d9",
            value: "Express JS"
          },
          {
            _id: "5cd9449b48bbdffe3c055b24",
            value: "Sails JS"
          }
        ]
      },
      {
        _id: "5cd67ee94759da8cf4d94e66",
        value: "Web Design",
        nodes: [
          {
            _id: "5cd9449b5a45115f94995448",
            value: "HTML"
          },
          {
            _id: "5cd9449b7a4ce5f2d7027d1e",
            value: "CSS",
            nodes: [
              {
                _id: "5cd9449b55f98214515e217a",
                value: "SASS"
              },
              {
                _id: "5cd9449b7faa4ccbe01d56d4",
                value: "LESS"
              }
            ]
          },
          {
            _id: "5cd9449b177552ff9142d8bf",
            value: "React JS"
          }
        ]
      }
    ];

    var articles = [
      {
        title: "sit ad irure proident ullamco",
        image: "https://picsum.photos/750/300?random=1",
        shortContent: "deserunt duis et id qui",
        detailContent:
          "Voluptate adipisicing cillum sint proident dolore nostrud. Proident enim ea nisi non Lorem nisi irure ad exercitation culpa nisi velit officia. Adipisicing do do exercitation laboris aliquip eiusmod adipisicing nulla elit cupidatat nisi velit in.\r\nEnim aliquip Lorem do ut mollit amet amet tempor deserunt nulla veniam tempor magna ipsum. Consequat ad qui sunt ex elit occaecat irure adipisicing ad ut deserunt voluptate adipisicing cillum. Elit nulla nostrud et reprehenderit dolore anim duis Lorem. Enim est do magna ad velit.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Boyd Wyatt",
        publishStatus: "Draft",
        visibleStatus: "Hot",
        viewCount: 573,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date()
      },
      {
        title: "nostrud ad elit voluptate aliquip",
        image: "https://picsum.photos/750/300?random=2",
        shortContent: "commodo amet incididunt et eu",
        detailContent:
          "Ea duis eiusmod irure cupidatat commodo ex magna. Adipisicing quis reprehenderit aliquip aliqua eiusmod ut cupidatat sit nulla sint officia incididunt. Cupidatat cupidatat voluptate aute reprehenderit irure. Est tempor magna deserunt pariatur sunt laborum aliqua nostrud sint magna qui.\r\nNostrud pariatur nulla tempor anim Lorem voluptate dolore excepteur consectetur. Enim consequat excepteur laboris dolor sint anim culpa sit. Veniam consequat ea veniam esse id quis anim esse proident consectetur nostrud cupidatat laboris minim. Reprehenderit eiusmod do fugiat excepteur Lorem. Ad proident sit incididunt dolore consequat minim adipisicing est ut ex laboris sit duis.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Barton Wynn",
        publishStatus: "Deleted",
        visibleStatus: "Docked",
        viewCount: 854,
        categoryId: "5cd67e885b7968371129b129",
        createDate: new Date()
      },
      {
        title: "dolor Lorem consequat eu laboris",
        image: "https://picsum.photos/750/300?random=3",
        shortContent: "commodo quis aute laboris ex",
        detailContent:
          "Aliquip magna magna ex amet et cupidatat voluptate. Minim sint occaecat exercitation mollit ex qui sit Lorem duis. Nulla magna ex exercitation exercitation elit incididunt ipsum excepteur irure et est id.\r\nVelit aliqua laborum nisi ad voluptate nostrud commodo pariatur sunt ullamco sint consectetur in. Est do voluptate sint deserunt cupidatat dolor qui. Eiusmod voluptate cillum aliqua occaecat proident reprehenderit tempor enim ut aliquip nulla sunt mollit fugiat. Aliquip est laborum quis irure non sunt est officia consequat sunt.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Hunter Stone",
        publishStatus: "Published",
        visibleStatus: "Normal",
        viewCount: 376,
        categoryId: "5cd67e8864a9d1e22b4889d9",
        createDate: new Date()
      },
      {
        title: "esse ad minim ea commodo",
        image: "https://picsum.photos/750/300?random=4",
        shortContent: "eu ad veniam consequat tempor",
        detailContent:
          "Anim esse sunt dolore duis. Proident aliquip mollit ullamco aliqua. Duis esse nulla sit ex ea.\r\nConsequat sint eiusmod aliquip eu eu ea ea reprehenderit. Lorem veniam magna in duis id est excepteur amet elit exercitation dolor et cillum sint. Eu quis minim exercitation excepteur. Amet est anim aliqua id id ea fugiat eu.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Tammi Wolf",
        publishStatus: "Deleted",
        visibleStatus: "Hot",
        viewCount: 808,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date()
      },
      {
        title: "magna laborum pariatur aliqua exercitation",
        image: "https://picsum.photos/750/300?random=5",
        shortContent: "ut minim ipsum magna laborum",
        detailContent:
          "Occaecat enim aliquip fugiat ad quis non duis esse dolor elit voluptate quis. Aliqua Lorem aliqua nulla ut irure do proident non esse. Non incididunt elit est mollit pariatur.\r\nLaborum amet Lorem magna laborum eiusmod reprehenderit ipsum commodo consequat qui ex ut nisi elit. Voluptate aliqua non occaecat sit nisi anim reprehenderit nisi labore officia sunt. Ipsum non laboris occaecat exercitation voluptate velit adipisicing consequat nisi ipsum incididunt exercitation. Duis consequat sit amet labore aliquip officia aliqua ut dolore ex.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Elise Rodriquez",
        publishStatus: "Deleted",
        visibleStatus: "Docked",
        viewCount: 102,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date()
      },
      {
        title: "excepteur voluptate ad ad quis",
        image: "https://picsum.photos/750/300?random=6",
        shortContent: "cupidatat irure ipsum reprehenderit eiusmod",
        detailContent:
          "Nostrud adipisicing id sit ullamco laboris aute non mollit nulla dolore in anim nulla ea. Labore elit laborum exercitation in laborum est excepteur. Proident veniam dolore nulla amet enim incididunt amet elit officia.\r\nEiusmod magna incididunt voluptate duis ad duis laborum. Proident duis veniam labore commodo cupidatat ad ad cupidatat. In commodo in nostrud nisi deserunt. Proident irure adipisicing nisi do. Reprehenderit do sit sit ut et id labore.\r\n",
        tags: [
          "lorum ipsum dolar sitmet",
          "apilowso clieom siamana welses aef asiso"
        ],
        author: "Gallagher Leach",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 832,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date()
      }
    ];

    Promise.all([Category.create(categories), Article.create(articles)])
      .then(seedData => res.send(seedData))
      .catch(console.log);
  });
};
