#!/bin/bash
set -e

# Create Dockerfile
cat > /root/chatbot-api/Dockerfile << 'HEREDOC'
FROM node:22-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY index.js .
EXPOSE 3001
CMD ["node", "index.js"]
HEREDOC

echo "Dockerfile created."

# Add chatbot service to docker-compose.yml (before volumes: section)
if grep -q "chatbot" /root/docker-compose.yml; then
  echo "Chatbot service already in docker-compose.yml, skipping."
else
  cp /root/docker-compose.yml /root/docker-compose.yml.backup
  echo "Backup saved to /root/docker-compose.yml.backup"

  awk '/^volumes:/{
    print "  chatbot:"
    print "    build: /root/chatbot-api"
    print "    restart: always"
    print "    expose:"
    print "      - \"3001\""
    print "    environment:"
    print "      - ANTHROPIC_API_KEY=${CHATBOT_API_KEY}"
    print "    labels:"
    print "      - traefik.enable=true"
    print "      - traefik.http.routers.chatbot.rule=Host(`api.srv1026626.hstgr.cloud`)"
    print "      - traefik.http.routers.chatbot.tls=true"
    print "      - traefik.http.routers.chatbot.entrypoints=web,websecure"
    print "      - traefik.http.routers.chatbot.tls.certresolver=mytlschallenge"
    print ""
  }1' /root/docker-compose.yml > /tmp/dc-new.yml

  cp /tmp/dc-new.yml /root/docker-compose.yml
  echo "docker-compose.yml updated."
fi

echo ""
echo "All done. Now run:"
echo "  1. echo 'CHATBOT_API_KEY=your-key-here' >> /root/.env"
echo "  2. cd /root && docker-compose up -d --build chatbot"
