@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
%~dp0devCommunication2-0.0.1-SNAPSHOT.exe restart
echo The devCommunication2-0.0.1-SNAPSHOT service current state:
%~dp0devCommunication2-0.0.1-SNAPSHOT.exe status
pause