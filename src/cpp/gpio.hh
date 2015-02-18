#ifndef GPIO_HH_
#define GPIO_HH_
#include <string>
using namespace std;

class Gpio
{
public:
	Gpio(void);
	Gpio(int pin);
	~Gpio(void);
	int setDirection(int dir);
	int setVal(int val);
	int getVal(void);
private:
	int pinNum;
	int pinVal; /* 0 or 1 */
	int pinDir; /* 0 = in, 1 = out */
	int pinExport(void);
	int pinUnexport(void);
};
#endif
