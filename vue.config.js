module.exports = {
  pwa: {
    name: "Liquid Measurement Converter",
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