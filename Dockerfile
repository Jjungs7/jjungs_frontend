FROM nginx:1.17.6-alpine

COPY ./dist /var/www/jjungs.kr
COPY ./nginx.conf /etc/nginx/conf.d/jjungs.kr.conf

CMD [ "nginx", "-g", "daemon off;" ]
