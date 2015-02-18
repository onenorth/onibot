#include "gpio.hh"
#include <string>
#include <iostream>
#include <fstream>
#include <sstream>
#include <cstdio>

using namespace std;


Gpio::Gpio(void) {
	pinNum = 4;
	pinVal = 0;
	pinDir = 0;
	pinExport();
}

Gpio::Gpio(int pin) {
	pinNum = pin;
	pinVal = 0;
	pinDir = 0;
	pinExport();
}

Gpio::~Gpio(void) {
	pinUnexport();
}

int
Gpio::setDirection(int dir) {
	/* 0 for input
	 * 1 for output
	 */
	pinDir = dir;
	if (dir != 0 || dir != 1) {
		cout << "ERR: tried to set pin " << pinNum << " to an invalid direction. Direction must be 0 for in, or 1 for out" << endl;
		return 1;
	} else {
		char buf [8];
		sprintf(buf, "%d", dir);
		string dirStr(buf);
		pinDir = dir;
		stringstream pinDirPath;
		pinDirPath << "/sys/class/gpio/gpio" << pinNum << "/direction";
		ofstream dirFile(pinDirPath.str().c_str());
		dirFile << dirStr;
		dirFile.close();
		return 0;
	}

}

int
Gpio::setVal(int val) {
	if (val != 0 || val != 1) {
		cout << "ERR: tried to set pin " << pinNum << " to value: " << val << endl;
		return 1;
	} else {
		char buf[8];
		sprintf(buf, "%d", val);
		string valStr(buf);
		pinVal = val;
		stringstream pinValPath; 
		pinValPath << "/sys/class/gpio/gpio" << pinNum << "/value";
		ofstream valFile(pinValPath.str().c_str());
		valFile << valStr;
		valFile.close();
		return 0;
	}
}

int
Gpio::getVal(void) {
	return pinVal;
}

/* private */
int
Gpio::pinExport(void) {
	string exportPath = "/sys/class/gpio/export";
	ofstream exportFile(exportPath.c_str());
	char buf [8];
	sprintf(buf, "%d", pinNum);
	string pinStr(buf);
	exportFile << pinStr;
	exportFile.close();
	return 0;
}

int
Gpio::pinUnexport(void) {
	string unexportPath = "/sys/class/gpio/unexport";
	ofstream unexportFile(unexportPath.c_str());
	char buf [8];
	sprintf(buf, "%d", pinNum);
	string pinStr(buf);
	unexportFile << pinStr;
	unexportFile.close();
	return 0;
}
