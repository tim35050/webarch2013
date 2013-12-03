"""Find 10 most common title words.

This program will take a CSV data file and output tab-seperated lines of

    Title word -> number of occurrences

To run:

    python top_title_words.py anonymous-msweb.data

To store output:

    python top_title_words.py anonymous-msweb.data > top_title_words.out
"""

from mrjob.job import MRJob
from combine_user_visits import csv_readline
from operator import itemgetter, attrgetter

class TopTitleWords(MRJob):

    def mapper(self, line_no, line):
        """Extracts the Vroot titles and iterates over their words"""
        cell = csv_readline(line)
        if cell[0] == 'A':
	    # split title
	    title = cell[3].split(' ')
	    # for each word in title, output word and count of 1
	    for word in title:
		yield word, 1

    def reducer(self, word, word_counts):
	"""Yield words and word_counts as pairs so that next step
	can sort results and display top 10"""
	yield None, (word, sum(word_counts))

    def reducer_find_top_words(self, _, word_count_pairs):
	""" Sort word_count_pairs greatest word count then print top 10 """ 
	sWords = sorted(word_count_pairs, key=lambda x:x[1], reverse=True)
	for pair in sWords[:10]:
    	    print str(pair[0]) + ": " + str(pair[1])

    def steps(self):
	return [
	    self.mr(mapper=self.mapper,
	            reducer=self.reducer),
	    self.mr(reducer=self.reducer_find_top_words)
	]

if __name__ == '__main__':
    TopTitleWords.run()
