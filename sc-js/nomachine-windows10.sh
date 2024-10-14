#!/bin/bash

# Function to handle labels (goto functionality)
function goto {
    label=$1
    cmd=$(sed -n "/^:[[:blank:]][[:blank:]]*${label}/{:a;n;p;ba};" $0 | grep -v ':$')
    eval "$cmd"
    exit
}

: playit
clear
echo "Repo: https://github.com/kmille36/Docker-Ubuntu-Desktop-NoMachine"
echo "======================="
echo "Setting up Playit.gg"
echo "======================="

# Install Playit.gg directly without downloading script
curl -SsL https://playit-cloud.github.io/ppa/key.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/playit.gpg >/dev/null
echo "deb [signed-by=/etc/apt/trusted.gpg.d/playit.gpg] https://playit-cloud.github.io/ppa/data ./" | sudo tee /etc/apt/sources.list.d/playit-cloud.list
sudo apt update
sudo apt install -y playit

# Start Playit.gg tunnel
playit &>/dev/null &
sleep 1

# Check if Playit is running
if curl --silent --show-error http://127.0.0.1:4040/api/tunnels > /dev/null 2>&1; then 
    echo "Playit.gg is running"
else
    echo "Playit.gg Error! Please try again!" 
    sleep 1 
    goto playit
fi

# Start Docker container with NoMachine
docker run --rm -d --network host --privileged --name nomachine-xfce4 \
-e PASSWORD=123456 -e USER=user --cap-add=SYS_PTRACE --shm-size=1g \
thuonghai2711/nomachine-ubuntu-desktop:windows10

clear
echo "NoMachine: https://www.nomachine.com/download"
echo "NoMachine Information:"
echo "======================="
echo "User: user"
echo "Passwd: 123456"
echo "======================="
echo "Playit.gg Tunnel Info:"
curl --silent --show-error http://127.0.0.1:4040/api/tunnels | sed -nE 's/.*public_url":"tcp:..([^"]*).*/\1/p'

echo "VM can't connect? Restart Cloud Shell then Re-run script."

# Simple status display loop for 12 hours (43,200 seconds)
for i in $(seq 1 43200); do 
    echo -en "\r Running .     $i s / 43200 s"; sleep 0.1
    echo -en "\r Running ..    $i s / 43200 s"; sleep 0.1
    echo -en "\r Running ...   $i s / 43200 s"; sleep 0.1
    echo -en "\r Running ....  $i s / 43200 s"; sleep 0.1
    echo -en "\r Running ..... $i s / 43200 s"; sleep 0.1
    echo -en "\r Running     . $i s / 43200 s"; sleep 0.1
done
