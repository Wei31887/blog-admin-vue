export default {
  routes: [
    {
      id: 1,
      title: "Dashbord",
      path: "/admin/home/welcome",
      icon: "home-filled",
      child: [],
    },
    {
      id: 2,
      title: "Article",
      path: "",
      icon: "setting",
      child: [
        {
          id: 201,
          title: "Article List",
          path: "/admin/home/blogList",
          icon: "messageBox",
        },
        {
          id: 202,
          title: "Article Category",
          path: "/admin/home/blogType",
          icon: "setting",
        },
        {
          id: 203,
          title: "Article Tags",
          path: "/admin/home/blogTag",
          icon: "setting",
        },
      ],
    },
    {
      id: 3,
      title: "Comments",
      path: "",
      icon: "view",
      child: [
        {
          id: 301,
          title: "Comment List",
          path: "/admin/home/commentList",
          icon: "messageBox",
        },
      ],
    },
    {
      id: 4,
      title: "About",
      path: "",
      icon: "avatar",
      child: [
        {
          id: 401,
          title: "Information",
          path: "/admin/home/myInfo",
          icon: "avatar",
        },
      ],
    },
    {
      id: 5,
      title: "System",
      path: "",
      icon: "setting",
      child: [
        {
          id: 501,
          title: "Password",
          path: "/admin/home/changePassword",
          icon: "setting",
        },
      ],
    },
  ],
};
