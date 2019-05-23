const Category = require("../models/category");
const Article = require("../models/article");

module.exports = app => {
  app.get("/api/seedDb", (req, res) => {
    const categories = [
      {
        _id: "5cd67e886a2d062fe06d0144",
        title: "Web Design",
        parentId: 0
      },
      {
        _id: "5cd67e885b7968371129b129",
        title: "HTML",
        parentId: "5cd67e886a2d062fe06d0144"
      },
      {
        _id: "5cd67e8864a9d1e22b4889d9",
        title: "CSS",
        parentId: "5cd67e885b7968371129b129"
      },
      {
        _id: "5cd67e88621e1e33c84845e2",
        title: "Javascript",
        parentId: 0
      },
      {
        _id: "5cd67e880467d1e3046085e9",
        title: "Express JS",
        parentId: 0
      },
      {
        _id: "5cd67ee94759da8cf4d94e66",
        title: "Node JS",
        parentId: "5cd67e88621e1e33c84845e2"
      },
      {
        _id: "5cd67ee99b3824d5a435ba2d",
        title: "Sails JS",
        parentId: "5cd67e880467d1e3046085e9"
      }
    ];

    const articles = [
      {
        title: "JavaScript Functions as JavaScript variables",
        image: "https://picsum.photos/750/300?random=1",
        shortContent: "Function Basics. Level Set!",
        tags: ["javascript", "web"],
        author: "Boyd Wyatt",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 573,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 1, 12)
      },
      {
        title: "Secrets of the JavaScript Ninja—The JavaScript Ecosystem",
        image: "https://picsum.photos/750/300?random=2",
        shortContent:
          "Applications based on the ideas originating from the web are becoming ubiquitous – the technologies we once exclusively used to develop client-side web applications, executed in the browser, have...",
        tags: ["js", "advanced js"],
        author: "Barton Wynn",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 854,
        categoryId: "5cd67e885b7968371129b129",
        createDate: new Date(2018, 3, 14)
      },
      {
        title: "Profiling NodeJS",
        image: "https://picsum.photos/750/300?random=3",
        shortContent:
          "Learn how to use the Linux performance analysis tool to diagnose problems in your application for debugging or performance optimization.",
        tags: ["node", "back-end"],
        author: "Hunter Stone",
        publishStatus: "Published",
        visibleStatus: "Normal",
        viewCount: 376,
        categoryId: "5cd67e8864a9d1e22b4889d9",
        createDate: new Date(2016, 2, 2)
      },
      {
        title: "Modular HTML pages",
        image: "https://picsum.photos/750/300?random=4",
        shortContent:
          "When statically generating HTML content, you face an interesting challenge: If the page frame (the “chrome” of a page) contains information that changes frequently, you need to re-generate all pages...",
        tags: ["UI", "clean code"],
        author: "Tammi Wolf",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 808,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 4, 1)
      },
      {
        title: "Tufte CSS",
        image: "https://picsum.photos/750/300?random=5",
        shortContent:
          "Tufte CSS provides tools to style web articles using the ideas demonstrated by Edward Tufte’s books and handouts. Tufte’s style is known for its simplicity, extensive use of sidenotes, tight...",
        tags: ["css", "front-end"],
        author: "Elise Rodriquez",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 102,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2011, 9, 7)
      },
      {
        title: " Nesting in Less and Sass",
        image: "https://picsum.photos/750/300?random=6",
        shortContent:
          "This article will give you a birds-eye-view on nesting (get it?) using these two well known and commonly used CSS pre-processors.",
        tags: ["less", "sass", "css"],
        author: "Gallagher Leach",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 832,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2012, 5, 2)
      },
      {
        title: "JavaScript Functions as JavaScript variables",
        image: "https://picsum.photos/750/300?random=7",
        shortContent: "Function Basics. Level Set!",
        tags: ["web", "front-end"],
        author: "Boyd Wyatt",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 573,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 1, 12)
      },
      {
        title: "Secrets of the JavaScript Ninja—The JavaScript Ecosystem",
        image: "https://picsum.photos/750/300?random=8",
        shortContent:
          "Applications based on the ideas originating from the web are becoming ubiquitous – the technologies we once exclusively used to develop client-side web applications, executed in the browser, have...",
        tags: ["js", "advanced js"],
        author: "Barton Wynn",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 854,
        categoryId: "5cd67e885b7968371129b129",
        createDate: new Date(2018, 3, 14)
      },
      {
        title: "Profiling NodeJS",
        image: "https://picsum.photos/750/300?random=9",
        shortContent:
          "Learn how to use the Linux performance analysis tool to diagnose problems in your application for debugging or performance optimization.",
        tags: ["node js", "back-end "],
        author: "Hunter Stone",
        publishStatus: "Published",
        visibleStatus: "Normal",
        viewCount: 376,
        categoryId: "5cd67e8864a9d1e22b4889d9",
        createDate: new Date(2016, 2, 2)
      },
      {
        title: "Modular HTML pages",
        image: "https://picsum.photos/750/300?random=10",
        shortContent:
          "When statically generating HTML content, you face an interesting challenge: If the page frame (the “chrome” of a page) contains information that changes frequently, you need to re-generate all pages...",
        tags: ["html", "clean code"],
        author: "Tammi Wolf",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 808,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 4, 1)
      },
      {
        title: "Tufte CSS",
        image: "https://picsum.photos/750/300?random=11",
        shortContent:
          "Tufte CSS provides tools to style web articles using the ideas demonstrated by Edward Tufte’s books and handouts. Tufte’s style is known for its simplicity, extensive use of sidenotes, tight...",
        tags: ["css", "web design"],
        author: "Elise Rodriquez",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 102,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2011, 9, 7)
      },
      {
        title: " Nesting in Less and Sass",
        image: "https://picsum.photos/750/300?random=12",
        shortContent:
          "This article will give you a birds-eye-view on nesting (get it?) using these two well known and commonly used CSS pre-processors.",
        tags: ["web-design"],
        author: "Gallagher Leach",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 832,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2012, 5, 2)
      },
      {
        title: "JavaScript Functions as JavaScript variables",
        image: "https://picsum.photos/750/300?random=13",
        shortContent: "Function Basics. Level Set!",
        tags: ["web", "front-end"],
        author: "Boyd Wyatt",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 573,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 1, 12)
      },
      {
        title: "Secrets of the JavaScript Ninja—The JavaScript Ecosystem",
        image: "https://picsum.photos/750/300?random=14",
        shortContent:
          "Applications based on the ideas originating from the web are becoming ubiquitous – the technologies we once exclusively used to develop client-side web applications, executed in the browser, have...",
        tags: ["js", "javascript"],
        author: "Barton Wynn",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 854,
        categoryId: "5cd67e885b7968371129b129",
        createDate: new Date(2018, 3, 14)
      },
      {
        title: "Profiling NodeJS",
        image: "https://picsum.photos/750/300?random=15",
        shortContent:
          "Learn how to use the Linux performance analysis tool to diagnose problems in your application for debugging or performance optimization.",
        tags: ["node", "Node JS"],
        author: "Hunter Stone",
        publishStatus: "Published",
        visibleStatus: "Normal",
        viewCount: 376,
        categoryId: "5cd67e8864a9d1e22b4889d9",
        createDate: new Date(2016, 2, 2)
      },
      {
        title: "Modular HTML pages",
        image: "https://picsum.photos/750/300?random=16",
        shortContent:
          "When statically generating HTML content, you face an interesting challenge: If the page frame (the “chrome” of a page) contains information that changes frequently, you need to re-generate all pages...",
        tags: ["clean code"],
        author: "Tammi Wolf",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 808,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 4, 1)
      },
      {
        title: "Tufte CSS",
        image: "https://picsum.photos/750/300?random=17",
        shortContent:
          "Tufte CSS provides tools to style web articles using the ideas demonstrated by Edward Tufte’s books and handouts. Tufte’s style is known for its simplicity, extensive use of sidenotes, tight...",
        tags: ["css"],
        author: "Elise Rodriquez",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 102,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2011, 9, 7)
      },
      {
        title: " Nesting in Less and Sass",
        image: "https://picsum.photos/750/300?random=18",
        shortContent:
          "This article will give you a birds-eye-view on nesting (get it?) using these two well known and commonly used CSS pre-processors.",
        tags: ["web-design"],
        author: "Gallagher Leach",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 832,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2012, 5, 2)
      },
      {
        title: "JavaScript Functions as JavaScript variables",
        image: "https://picsum.photos/750/300?random=19",
        shortContent: "Function Basics. Level Set!",
        tags: ["javascript", "web"],
        author: "Boyd Wyatt",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 573,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 1, 12)
      },
      {
        title: "Secrets of the JavaScript Ninja—The JavaScript Ecosystem",
        image: "https://picsum.photos/750/300?random=20",
        shortContent:
          "Applications based on the ideas originating from the web are becoming ubiquitous – the technologies we once exclusively used to develop client-side web applications, executed in the browser, have...",
        tags: ["js", "javascript"],
        author: "Barton Wynn",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 854,
        categoryId: "5cd67e885b7968371129b129",
        createDate: new Date(2018, 3, 14)
      },
      {
        title: "Profiling NodeJS",
        image: "https://picsum.photos/750/300?random=21",
        shortContent:
          "Learn how to use the Linux performance analysis tool to diagnose problems in your application for debugging or performance optimization.",
        tags: ["node", "node js"],
        author: "Hunter Stone",
        publishStatus: "Published",
        visibleStatus: "Normal",
        viewCount: 376,
        categoryId: "5cd67e8864a9d1e22b4889d9",
        createDate: new Date(2016, 2, 2)
      },
      {
        title: "Modular HTML pages",
        image: "https://picsum.photos/750/300?random=22",
        shortContent:
          "When statically generating HTML content, you face an interesting challenge: If the page frame (the “chrome” of a page) contains information that changes frequently, you need to re-generate all pages...",
        tags: ["html", "web design"],
        author: "Tammi Wolf",
        publishStatus: "Published",
        visibleStatus: "Hot",
        viewCount: 808,
        categoryId: "5cd67e886a2d062fe06d0144",
        createDate: new Date(2019, 4, 1)
      },
      {
        title: "Tufte CSS",
        image: "https://picsum.photos/750/300?random=23",
        shortContent:
          "Tufte CSS provides tools to style web articles using the ideas demonstrated by Edward Tufte’s books and handouts. Tufte’s style is known for its simplicity, extensive use of sidenotes, tight...",
        tags: ["css", "front-end", "web design"],
        author: "Elise Rodriquez",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 102,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2011, 9, 7)
      },
      {
        title: " Nesting in Less and Sass",
        image: "https://picsum.photos/750/300?random=24",
        shortContent:
          "This article will give you a birds-eye-view on nesting (get it?) using these two well known and commonly used CSS pre-processors.",
        tags: ["less", "sass"],
        author: "Gallagher Leach",
        publishStatus: "Published",
        visibleStatus: "Docked",
        viewCount: 832,
        categoryId: "5cd67ee94759da8cf4d94e66",
        createDate: new Date(2012, 5, 2)
      }
    ];

    Promise.all([Category.create(categories), Article.create(articles)])
      .then(seedData => res.send(seedData))
      .catch(console.log);
  });
};
