module.exports = {
  pwa: {
    name: "Puji Ermanto || Coffee Again Script Again",
    themeColor: "#000"
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_main.scss";
        `
      }
    }
  }
};