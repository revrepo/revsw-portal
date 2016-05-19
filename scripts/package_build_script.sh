#!/bin/bash

#
# This script builds Rev portal Debian package
#

if [ -z "$WORKSPACE" ]; then
	echo "ERROR: WORKSPACE env. variable is not set"
	exit 1
fi

if [ -z "$BUILD_NUMBER" ]; then
	echo "ERROR: BUILD_NUMBER env. variable is not set"
	exit 1
fi

if [ ! -d "$WORKSPACE/code/public" ]; then
  echo "ERROR: $WORKSPACE/code/public directory does not exist. Do you need to run 'gulp build'?"
  exit 1
fi

VERSION=5.0.$BUILD_NUMBER

PACKAGEDIR=packages

if [ ! -d $PACKAGEDIR ]; then
        echo "INFO: Directory $PACKAGEDIR does not exist - creating it..."
        mkdir $PACKAGEDIR
        if [ $? -ne 0 ]; then
                echo "ERROR: Failed to create directory $PACKAGEDIR - aborting"
                exit 1
        fi
fi

echo $VERSION > $PACKAGEDIR/version.txt

PACKAGENAME=revsw-portal

WORKDIR="package_build_dir"
sudo rm -rf $WORKDIR

mkdir $WORKDIR
cd $WORKDIR

if [ $? -ne 0 ]; then
  echo "FATAL: Failed to CD to directory $WORKDIR"
  exit 1
fi


foldername=$PACKAGENAME'_'$VERSION
mkdir -p $foldername/DEBIAN
touch $foldername/DEBIAN/control

PackageName=$PACKAGENAME
PackageVersion=$VERSION
MaintainerName="Victor Gartvich"
MaintainerEmail=victor@revsw.com

echo "Package: $PackageName
Version: $PackageVersion
Architecture: amd64
Maintainer: $MaintainerName <$MaintainerEmail>
Installed-Size: 26
Depends: nginx
Recommends: nginx
Section: unknown
Priority: extra
Homepage: www.revsw.com
Description: Rev Customer Portal UI Component" >> $foldername/DEBIAN/control

echo "/opt/revsw-portal/config.js" > $foldername/DEBIAN/conffiles

mkdir -p $foldername/opt/$PackageName 

cp -rf  $WORKSPACE/code/public/* $foldername/opt/$PackageName/
echo $VERSION > $foldername/opt/$PackageName/version.txt

sudo chown -R root:root $foldername/opt

dpkg -b $foldername $WORKSPACE/$PACKAGEDIR/$foldername.deb

