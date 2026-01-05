La clave para poder crear un contenedor de libre translate y que se descarguen todos los idiomas seleccionados y en todas sus direcciones es utilizar la propiedad: LT_UPDATE_MODELS="true". 

El comando para crear el contenedor sería el siguiente:

docker run -d --name libretranslate -p 5000:5000 -e LT_LOAD_ONLY="en,es,de,fr" -e LT_PIVOT="true" -e LT_UPDATE_MODELS="true" --restart always libretranslate/libretranslate

Lo que hace que los lenguajes y sus targets sean los siguientes:
[{"code":"en","name":"English","targets":["de","en","es","fr"]},{"code":"fr","name":"French","targets":["de","en","es","fr"]},{"code":"de","name":"German","targets":["de","en","es","fr"]},{"code":"es","name":"Spanish","targets":["de","en","es","fr"]}]