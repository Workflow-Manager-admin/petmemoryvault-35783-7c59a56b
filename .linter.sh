#!/bin/bash
cd /home/kavia/workspace/code-generation/petmemoryvault-35783-7c59a56b/petmemoryvault
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

