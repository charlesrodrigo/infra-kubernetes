# Istio 
Testes com o Virtual service do Istio, realizando o roteamento de acordo com path ou header

Para realizar os testes foi criado 3 nanoserviço:
- workload-one e workload-two, tem como objetivo retornar seu nome, ip e url recebida
- workload-client é o que irá chamar um serviço com um endpoint unico, e conforme o path ou header o Virtual Service do istio irá rotear para o serviço correto.

Primeiros passos é gerar a as imagens docker, executar os comandos apartir da pasta raiz do projeto

```
docker build ./istio/virtual-service/workload-one/ -t workload-one

kubectl apply -f ./istio/virtual-service/workload-one/deployment.yaml 
```

```
docker build ./istio/virtual-service/workload-two/ -t workload-two

kubectl apply -f ./istio/virtual-service/workload-two/deployment.yaml 
```

```
docker build ./istio/virtual-service/workload-client/ -t workload-client

kubectl apply -f ./istio/virtual-service/workload-client/deployment.yaml 

kubectl apply -f ./istio/virtual-service/workload-client/route.yaml 
```

Após executar os comandos se tudo deu certo, você realizar uma chamada http GET 

O path /qualquercoisa deve direcionar sempre para a rota padrão que é o workload one

```
curl --location --request GET 'http://localhost:8080/worload/01'
curl --location --request GET 'http://localhost:8080/worload/02'
curl --location --request GET 'http://localhost:8080/qualquercoisa'
```

Testando o route por header, o header de valor 03 deve direcionar para o workload padrão 01
```
curl --location --request GET 'http://localhost:8080/worload/quaquercoisa' --header 'workload: 01'
curl --location --request GET 'http://localhost:8080/worload/quaquercoisa' --header 'workload: 02'
curl --location --request GET 'http://localhost:8080/worload/quaquercoisa' --header 'workload: 03'
```

