from __future__ import division
from nltk.corpus import wordnet as wn
import nltk
import re
import pprint
import os
import itertools
import json
import random

RAW_DATA_PATH = "/Users/akilharris/projects/yeezylyrics/lyrics/"
DATA_PATH = "./data/"
STOP_WORDS = (" I ", " I'm ", " a ", " an ", " and ", " are ", " as ", " at ", " be ", " by ", " for ", " from ", " has ", " he ", " in ", " is ", " it ", " its ", " of ", " on ", " that ", " the ", " to ", " was ", " were ", " will ","with")
STOP_WORDS2 = (" I ", " I'm ", " a ", " about ", " an ", " are ", " as ", " at ", " be ", " by ", " com ", " for ", " from ", " how ", " in ", " is ", " it ", " of ", " on ", " or ", " that ", " the ", " this ", " to ", " was ", " what ", " when ", " where ", " who ", " will ", " with ", " the ", " www ")
# MYSQL_STOP_WORDS = (" a's "," able ", " about ", " above ", " according", "accordingly", "across", "actually", "after", "afterwards", "again", "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c'mon", "c's", "came", "can", "can't", "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come", "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", "corresponding", "could", "couldn't", "course", "currently", "definitely", "described", "despite", "did", "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", "each", "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except", "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth", "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had", "hadn't", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he's", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "i'd", "i'll", "i'm", "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", "it's", "its", "itself", "just", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "little", "look", "looking", "looks", "ltd", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "name", "namely", "nd", "near", "nearly", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non", "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", "nowhere", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "particular", "particularly", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provides", "que", "quite", "qv", "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards", "relatively", "respectively", "right", "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody", "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t's", "take", "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", "therefore", "therein", "theres", "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "twice", "two", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up", "upon", "us", "use", "used", "useful", "uses", "using", "usually", "value", "various", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "we'll", "we're", "we've", "welcome", "well", "went", "were", "weren't", "what", "what's", "whatever", "when", "whence", "whenever", "where", "where's", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "who's", "whoever", "whole", "whom", "whose", "why", "will", "willing", "wish", "with", "within", "without", "won't", "wonder", "would", "wouldn't", "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "zero")

def getFiles():
    return os.listdir(RAW_DATA_PATH)


def getAll():
    return getFiles()


def getAllYeezus():
    return itertools.ifilter(lambda x: "Kanye-" in x, getAll())


def getFileContents(file_name):
    with open(RAW_DATA_PATH + file_name) as f:
        return [line for line in f.readlines() if "BMI" not in line and "ASCAP" not in line]


def flatmap(func, iterable):
    return itertools.chain.from_iterable(itertools.imap(func, iterable))


def cleanFile(raw_file):
    file_contents = ' '.join(raw_file)
    file_contents = file_contents.decode('utf-8').replace(u"\u2018", "'")
    file_contents = file_contents.replace(u"\u2019", "'").replace(u"\u201d", '"')
    file_contents = file_contents.replace(u"\u201c", '"')
    file_contents = file_contents.replace(u"\u2013", '-').replace(u"\u2014", '-')
    return file_contents


def tokenize(filecontents):
    # return [nltk.word_tokenize(s) for s in filecontents.split("\n") if s is not " "]
    return [s.strip(' ,()') for s in filecontents.split("\n") if s is not "" or s is not " "]


def lemmagetter(synset):
    return synset.lemma_names()


def getpos(pos):
    if pos.startswith("N"):
        return wn.NOUN
    elif pos.startswith("R"):
        return wn.ADV
    else:
        return wn.VERB


def synsetbuilder(wordpair):
    word = wordpair[0]
    pos = getpos(wordpair[1])
    synsets = set(flatmap(lemmagetter, wn.synsets(word, pos=pos)))
    return ( word, pos, synsets )


# def reply(input):
#     output = cleanstopwords(input.lower())

#     tokens = nltk.word_tokenize(output)
#     text = nltk.Text(tokens)
#     pos = nltk.pos_tag(text)
#     # filtered_pos = itertools.ifilter(lambda x: x[1].startswith("V") or x[1].startswith("N"), pos)
#     filtered_pos = [p for p in pos if p[1].startswith("VB") or p[1].startswith("NN") or p[1].startswith("RB")]
#     output_synsets = itertools.imap(synsetbuilder, filtered_pos)
#     for outputset in output_synsets:
#         word, synset = outputset
#         print(word + " => " + " ".join(synset))
#     return output


def cleanstopwords(input):
    output = input
    for stopword in STOP_WORDS2:
        output = output.replace(stopword.lower(), " ")
    return output


def validpos(pos):
    return pos.startswith("VB") or pos.startswith("NN") or pos.startswith("RB")


def makeentry(word, i, issyn):
    return {
        'line': i,
        'pos': getpos(word[1]),
        'word': word[0],
        'syn': issyn
    }


def getsynsets(worddata):
    word = worddata['word']
    pos = worddata['pos']
    line = worddata['line']
    synsets = set(flatmap(lemmagetter, wn.synsets(word, pos=pos)))
    return [makeentry((synword, pos), line, True) for synword in synsets if "_" not in synword]


def groupwords(words, group):
    for word in words:
        key = word['word'] + "::" + word['pos']
        # pprint.pprint(word)
        if key in group:
            group[key]['lines'].add(word['line'])
            group[key]['syn'] = False
        else:
            group[key] = {
                'lines': set(),
                'word': word['word'],
                'pos': word['pos'],
                'syn': False
            }
            group[key]['lines'].add(word['line'])

            for syn in getsynsets(word):
                synkey = syn['word'] + "::" + syn['pos']
                if synkey in group:
                    group[synkey]['lines'].add(syn['line'])
                else:
                    group[synkey] = {
                        'lines': set(),
                        'word': syn['word'],
                        'pos': syn['pos'],
                        'syn': True
                    }
                    group[synkey]['lines'].add(syn['line'])
    return group


def getrawfiles():
    rawfiles = []
    for file_name in itertools.islice(getAllYeezus(), 0, 400):
        rawfiles.append(cleanFile(getFileContents(file_name)))
    return rawfiles


def buildworddata(sentences):
    words = []
    i = 0
    slist = []
    for s in sentences:
        if s != "":
            print('-' + s + '-')
            slist.append(s)
            cleaned = cleanstopwords(s.lower())
            words += [makeentry(pos, i, False) for pos in nltk.pos_tag(nltk.word_tokenize(cleaned)) if validpos(pos[1])]
            i += 1
    return (words, slist)


def savelyricwords(yeezusDict):
    class SetEncoder(json.JSONEncoder):
        def default(self, obj):
            if isinstance(obj, set):
                return list(obj)
            return json.JSONEncoder.default(self, obj)

    # pprint.pprint(yeezusDict.keys())
    # print(len(yeezusDict.keys()))
    with open(DATA_PATH + 'lyrics_words.json', 'w') as f:
        f.write(json.dumps(yeezusDict, cls=SetEncoder))
    print("done building: " + DATA_PATH + "lyrics_words.json")


def savelyriclist(slist):
    with open(DATA_PATH + 'slist.json', 'w') as f:
        f.write(json.dumps(slist))
    print("done building: " + DATA_PATH + "slist.json")


def getslist():
    filename = 'slist.json'
    with open(DATA_PATH + filename) as f:
            jsoncontents = json.load(f)
    return jsoncontents

def builddatafiles():
    # rawfiles = getrawfiles()
    # sentences = flatmap(tokenize, rawfiles)
    sentences = getslist()
    words, slist = buildworddata(sentences)
    yeezusDict = groupwords(words, {})
    savelyriclist(slist)
    savelyricwords(yeezusDict)


class YeezusResponder():

    def __init__(self):
        self.words = dict(self.getfile('lyrics_words.json'))
        self.slist = list(self.getfile('slist.json'))
        self.speciallines = [16, 175, 1164, 1208, 3625, 3813, 5180, 2149, 2164, 398, 871, 640, 614, 187, 4, 528, 529, 530, 531, 532, 2887, 2888, 2889, 2890, 2891, 2892, 4100, 4101, 4102, 4103, 4104, 4105, 4106, 4107, 4108, 4109, 4110, 4111, 4112, 4113, 4114, 4115, 4116, 4117, 4118, 4119, 4120, 1441, 1315, 1283, 1103, 876, 827]
        self.veryspeciallines = [771, 673, 6013, 3489, 412, 364, 324, 297, 685, 697, 1464, 1209]
        self.veryspecial = [self.getline(linenumber) for linenumber in self.veryspeciallines]
        self.special = [self.getline(linenumber) for linenumber in self.speciallines]
        # pprint.pprint(self.special)
        # pprint.pprint(self.veryspecial)

    def getfile(self, filename):
        with open(DATA_PATH + filename) as f:
            jsoncontents = json.load(f)
        return jsoncontents

    def getmessagesynsets(self, message):
        output = cleanstopwords(message.lower())
        tokens = nltk.word_tokenize(output)
        text = nltk.Text(tokens)
        pos = nltk.pos_tag(text)
        filtered_pos = [p for p in pos if p[1].startswith("VB") or p[1].startswith("NN") or p[1].startswith("RB")]
        output_synsets = itertools.imap(self.synsetbuilder, filtered_pos)
        # for outputset in output_synsets:
        #     word, synset = outputset
        #     print(word + " => " + " ".join(synset))
        return output_synsets

    def lemmagetter(self, synset):
        return synset.lemma_names()


    def getpos(self, pos):
        if pos.startswith("N"):
            return wn.NOUN
        elif pos.startswith("R"):
            return wn.ADV
        else:
            return wn.VERB


    def synsetbuilder(self, wordpair):
        word = wordpair[0]
        pos = self.getpos(wordpair[1])
        synsets = set(flatmap(self.lemmagetter, wn.synsets(word, pos=pos)))
        return ( word, pos, synsets )

    '''
        Go through the steps to build a reply.
    '''
    def buildreply(self, message):
        message_synsets = self.getmessagesynsets(message)
        lines = self.buildlines(message_synsets)
        # print(lines)
        line_counts = self.linecount(lines)
        # print(line_counts)
        lyrics = list(self.getlyrics(line_counts))
        # print(lyrics)
        if len(lyrics) < 1:
            lyrics = self.getspeciallyrics()

        if self.addveryspecial():
            lyrics += self.veryspecial

        lyric = self.randomlyric([lyric for lyric in lyrics if lyric])
        return lyric

    '''
        test to add in very special lines.
    '''
    def addveryspecial(self):
        choices = [1 for _ in xrange(99)]
        choices.append(0)
        random.seed()
        return random.choice(choices) == 0


    '''
        Fetch a random return lyric
    '''
    def randomlyric(self, lyrics):
        l = len(lyrics)
        random.seed()
        if l == 1:
            return lyrics[0]
        else:
            return lyrics[random.randrange(l-1)]

    '''
        Return a list of lyrics for every valid word in message.
    '''
    def getlyrics(self, line_counts):
        print(line_counts)
        return flatmap(self.getwordlyrics, line_counts.items())

    '''
        Return some handpicked favorites.
    '''
    def getspeciallyrics(self):
        return self.special + self.veryspecial + self.veryspecial

    '''
        Get the subset of line numbers to return.
        Always add self.veryspeciallines
    '''
    def getwordlyrics(self, word_line_counts):
        word, wvals = word_line_counts
        counts = wvals.values()
        wmax = max(counts)
        wmin = min(counts)
        pprint.pprint((wmax, wmin, wmax-wmin))
        if wmax - wmin >= 4:
            return [self.getline(linenumber) for linenumber, count in wvals.items() if count >= wmax - 2 ]
        elif wmax - wmin >= 2:
            return [self.getline(linenumber) for linenumber, count in wvals.items() if count >= wmax - 1 ]
        else:
            return [self.getline(linenumber) for linenumber, count in wvals.items() if count == wmax]

    def getline(self, linenumber):
        lyric = self.slist[linenumber]
        if ":" not in lyric:
            return lyric
        else:
            return ""

    '''
        build the list lines from all the words / synset words.
    '''
    def buildlines(self, message_synsets):
        lines = {}
        for s in message_synsets:
            word, pos, synset = s
            w_key = word + "::" + pos
            if w_key in self.words:
                lines[w_key] = self.words[w_key]["lines"]
            for w in synset:
                if "_" not in w:
                    s_key = w + "::" + pos
                    if s_key in self.words:
                        if w_key in lines.keys():
                            lines[w_key] += self.words[s_key]["lines"]
                        else:
                            lines[w_key] = self.words[s_key]["lines"]
            if w_key in lines.keys():
                lines[w_key] = sorted(lines[w_key])
        return lines

    '''
        count up all the lines.
    '''
    def linecount(self, word_lines):
        counted = {}

        # def iter(acc, curr, ilines):
        #     if len(ilines) == 0:
        #         return acc
        #     else:
        #         if curr in acc:
        #             acc[curr] += 1
        #         else:
        #             acc[curr] = 1
        #         return iter(acc, ilines.pop(), ilines)

        for w in word_lines:
            lines = word_lines[w]
            val = {}
            for line in lines:
                if line in val:
                    val[line] += 1
                else:
                    val[line] = 1
            # val = iter({}, lines.pop(), lines)
            counted[w] = val

        return counted


def main():
    # builddatafiles()
    yr = YeezusResponder()
    while 1:
        input = raw_input("=> : ")
        reply = yr.buildreply(input)
        print("<= y :" + reply)


if __name__ == "__main__":
    main()
