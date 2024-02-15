from scrapy.crawler import CrawlerProcess
import scrapy
import pandas as pd
import subprocess
# import queue
# import subprocess
# import threading


class NewsSpider(scrapy.Spider):
    name = 'news'
    start_urls = [
        'https://timesofindia.indiatimes.com/',
        'https://indianexpress.com/',
        'https://www.hindustantimes.com/',
        'https://www.thehindu.com/',
        'https://www.deccanherald.com/',
        'https://www.telegraphindia.com/',
        'https://www.newindianexpress.com/',
        'https://www.thequint.com/',
        'https://www.livemint.com/',
        'https://www.financialexpress.com/',
        'https://www.business-standard.com/',
        'https://www.firstpost.com/',
        'https://www.outlookindia.com/',
        'https://www.indiatoday.in/',
        'https://www.theweek.in/',
        'https://www.dnaindia.com/',
        'https://www.freepressjournal.in/',
        'https://www.thestatesman.com/',
        'https://www.tribuneindia.com/',
        'https://www.mid-day.com/'
    ]

    def parse(self, response):
        if 'timesofindia' in response.url:
            yield from self.parse_times_of_india(response)
        elif 'indianexpress' in response.url:
            yield from self.parse_indian_express(response)
        elif 'hindustantimes' in response.url:
            yield from self.parse_hindustan_times(response)
        elif 'thehindu' in response.url:
            yield from self.parse_the_hindu(response)
        elif 'deccanherald' in response.url:
            yield from self.parse_deccan_herald(response)
        elif 'telegraphindia' in response.url:
            yield from self.parse_telegraph_india(response)
        elif 'newindianexpress' in response.url:
            yield from self.parse_new_indian_express(response)
        elif 'thequint' in response.url:
            yield from self.parse_the_quint(response)
        elif 'livemint' in response.url:
            yield from self.parse_livemint(response)
        elif 'financialexpress' in response.url:
            yield from self.parse_financial_express(response)
        elif 'business-standard' in response.url:
            yield from self.parse_business_standard(response)
        elif 'firstpost' in response.url:
            yield from self.parse_firstpost(response)
        elif 'outlookindia' in response.url:
            yield from self.parse_outlook_india(response)
        elif 'indiatoday' in response.url:
            yield from self.parse_indiatoday(response)
        elif 'theweek' in response.url:
            yield from self.parse_the_week(response)
        elif 'dnaindia' in response.url:
            yield from self.parse_dnaindia(response)
        elif 'freepressjournal' in response.url:
            yield from self.parse_freepressjournal(response)
        elif 'thestatesman' in response.url:
            yield from self.parse_thestatesman(response)
        elif 'tribuneindia' in response.url:
            yield from self.parse_tribuneindia(response)
        elif 'mid-day' in response.url:
            yield from self.parse_mid_day(response)

    def parse_times_of_india(self, response):
        # Implement parsing logic for Times of India
        articles = response.css('a[href*="/india/"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_indian_express(self, response):
        # Implement parsing logic for Indian Express
        articles = response.css('h3 a::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_hindustan_times(self, response):
        # Implement parsing logic for Hindustan Times
        articles = response.css('a::attr(href)').re(
            r'\/[^\/]+\/[^\/]+\/\d+\/\d+\.html')
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_the_hindu(self, response):
        # Implement parsing logic for The Hindu
        articles = response.css('a.story-card75x1-text::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_deccan_herald(self, response):
        # Implement parsing logic for Deccan Herald
        articles = response.css(
            'a[id*="block-system-main"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_telegraph_india(self, response):
        # Implement parsing logic for The Telegraph India
        articles = response.css('a[href*="/calcutta/"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_new_indian_express(self, response):
        # Implement parsing logic for New Indian Express
        articles = response.css('h3 a::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_the_quint(self, response):
        # Implement parsing logic for The Quint
        articles = response.css('a.card-heading::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_livemint(self, response):
        # Implement parsing logic for Live Mint
        articles = response.css('a[id*="a_title"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_financial_express(self, response):
        # Implement parsing logic for Financial Express
        articles = response.css('a.headline::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_business_standard(self, response):
        # Implement parsing logic for Business Standard
        articles = response.css('a.readmore-link::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_firstpost(self, response):
        # Implement parsing logic for Firstpost
        articles = response.css('a.article-title::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_outlook_india(self, response):
        # Implement parsing logic for Outlook India
        articles = response.css('a[id*="morenews"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_indiatoday(self, response):
        # Implement parsing logic for India Today
        articles = response.css('a[id*="story-"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_the_week(self, response):
        # Implement parsing logic for The Week
        articles = response.css('a[class*="storyLink"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_dnaindia(self, response):
        # Implement parsing logic for DNA India
        articles = response.css('a[href*="/news/"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_freepressjournal(self, response):
        # Implement parsing logic for Free Press Journal
        articles = response.css(
            'a[href*="/freepressjournal/"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_thestatesman(self, response):
        # Implement parsing logic for The Statesman
        articles = response.css(
            'a[href*="/statesmannews/"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_tribuneindia(self, response):
        # Implement parsing logic for Tribune India
        articles = response.css('a[class*="hlheading"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_mid_day(self, response):
        # Implement parsing logic for Mid-Day
        articles = response.css('a[class*="headline1"]::attr(href)').extract()
        for article in articles:
            yield response.follow(article, self.parse_article)

    def parse_article(self, response):
        # Extract title and text from the article page
        title = response.css('title::text').get()
        text = ''.join(response.css('p::text').extract())

        yield {
            'Title': title,
            'Text': text,
            'Source URL': response.url,
        }


def scrap_news():

    spider = NewsSpider()

    print('loco')
    process = CrawlerProcess(settings={
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'FEED_FORMAT': 'json',
        'FEED_URI': './tmp/news_data.json',  # Specify the output file for scraped data
        'LOG_LEVEL': 'INFO',  # Adjust the log level as needed
    })

    # Start the spider and scraping process
    process.crawl(NewsSpider)
    process.start()
    process.join()
