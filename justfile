default:
    just --list

fmt:
    deno fmt

lint:
    deno lint

front:
    deno task dev

[working-directory : 'server']
back:
    mvn spring-boot:run

[working-directory : 'server']
test-back:
    mvn test


db:
    cd db && ./start.sh 