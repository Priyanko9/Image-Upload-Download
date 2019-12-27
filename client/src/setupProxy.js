const proxy=require('http-proxy-middleware');

module.exports=(app)=>{
    app.use(proxy(['/imageUpload'],{target:"http://localhost:3006"}));
}