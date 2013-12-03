"""Find users with more than 20 visits.

This program will take a transformed CSV data file and output tab-seperated lines of

    User -> number of visits

To run:

    python top_users.py user-visits_msweb.data

To store output:

    python top_users.py user-visits_msweb.data > top_users.out
"""

from mrjob.job import MRJob
from combine_user_visits import csv_readline

class TopUsers(MRJob):

    def mapper(self, line_no, line):
        """Extracts the Vroot that was visited"""
        cell = csv_readline(line)
        if cell[0] == 'V':
	    # output ID of user visiting Vroot along with a count of 1
            yield cell[2], 1

    def reducer(self, user_id, visit_counts):
        """Sumarizes the visit counts by adding them together.  If total visits
        is more than 20, yield the results"""
        total = sum(visit_counts)
        if total > 20:
	    # output user ID along with total visit count
            yield user_id, total

if __name__ == '__main__':
    TopUsers.run()
