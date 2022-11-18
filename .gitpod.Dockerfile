FROM gitpod/workspace-full

USER gitpod

RUN bash -c 'VERSION="14.21.1" \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION && nvm alias default $VERSION'
RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
RUN cd /home/gitpod && curl https://install.meteor.com/ | sh
