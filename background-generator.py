import random as r

cs = '<circle cx="{}" cy="{}" r="0.5" fill="white"/>'
cm = '<circle cx="{}" cy="{}" r="1" fill="white"/>'
cl = '<circle cx="{}" cy="{}" r="1.5" fill="white"/>'

def f(n, c):
	o = ''
	for i in range(n):
		o += c.format(r.randint(0,501),r.randint(0,501))
	return o

def make(s,m,l):
	fl = open('images\stars.svg', 'w')
	fl.write(start)
	fl.write(f(s,cs))
	fl.write(f(m,cm))
	fl.write(f(l,cl))
	fl.write('</svg>')
	fl.close()
