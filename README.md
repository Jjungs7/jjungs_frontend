# Jjungs frontend [![travis build status](https://travis-ci.com/Jjungs7/jjungs_frontend.svg?branch=master)](https://travis-ci.com/Jjungs7/jjungs_frontend/builds)
[개인 홈페이지](https://jjungs.kr) 프론트엔드

## Prerequisites
- nodejs v12.14.0
- npm v6.13.4
- Docker
- [Vue cli](https://cli.vuejs.org/)

### 개발
```
# Install dependencies
npm i

# Run in development mode
npm run serve
```

### 배포
```
# Lint before build
npm run lint

# Build for minimization
npm run build

# Build docker image
docker build -t equisde/jjungs-web:(version) .

# Run in docker
docker run --rm --name jjungs-web -p 8080:8080 equisde/jjungs-web:(version)
```
