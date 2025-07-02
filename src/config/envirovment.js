const config = (env) => {
    let DATABASE, URI, PORT;
    PORT = 3000;
    if(env.ENV == "dev"){
        DATABASE = env.MONGODB_LOCAL;
        URI = `http://localhost:${PORT}/`
    }else{
        DATABASE = env.MONGODB_LOCAL
    }
    return {DATABASE, URL, PORT}
}

module.exports = {config}