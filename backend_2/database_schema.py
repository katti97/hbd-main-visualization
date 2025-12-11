"""
HummingBird Database Schema and KPI Definitions
"""

from typing import Dict, List, Any

# Database Configuration
DATABASE_NAME = "hummingbird"
TABLE_NAME = "bookings_dataset"

class HummingBirdSchema:
    """HummingBird Database Schema with KPI definitions"""
    
    def __init__(self):
        self.table_metadata = self._initialize_schema()
        
    def _initialize_schema(self) -> Dict[str, Any]:
        
        """Initialize schema with table and column definitions"""
        
        return {
            "table_name": TABLE_NAME,
            "table_description": """This table contains information about Bookings that clients have made who are identified by their Client Id. If different rows have the same BookingId and BookingCode then they can have different guests with unique GuestId.""",
            "key_columns": {
                "bookingcode": {
                    "alias": "Booking Code",
                    "data_type": "BIGINT",
                    "business_definition": "Unique identifier for each booking made by a client.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "374274, 374280, 374289, etc.",
                    "business_criticality": "High"
                },
                "bookingid": {
                    "alias": "Booking ID",
                    "data_type": "BIGINT",
                    "business_definition": "Unique identifier for each booking made by a client.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "374274, 374275, etc.",
                    "industry_terms": "Booking ID",
                    "business_criticality": "High"
                },
                "masterclientname": {
                    "alias": "Master Client Name",
                    "data_type": "TEXT",
                    "business_definition": "Parent company of the Client who has made these bookings with HummingBird.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "ICICI Bank Limited Mumbai, Escorts Limited, CIPLA LTD etc.",
                    "industry_terms": "master client name",
                    "business_criticality": "High"
                },
                "clientname": {
                    "alias": "Client Name",
                    "data_type": "TEXT",
                    "business_definition": "Company of the Client who has made these bookings with HummingBird.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "ICICI Bank Limited, Maruti Suzuki India Limited, Everest Industries Limited etc.",
                    "industry_terms": "client name",
                    "business_criticality": "High"
                },
                "clientid": {
                    "alias": "Client ID",
                    "data_type": "BIGINT",
                    "business_definition": "Unique numerical identifier for company of the Client.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "218, 2289, 928 etc.",
                    "industry_terms": "Client ID",
                    "business_criticality": "High"
                },
                "propertyname": {
                    "alias": "Property Name",
                    "data_type": "TEXT",
                    "business_definition": "Unique name string identifier for property that the Client is allotted to.",
                    "unit_of_measure": "String",
                    "null_allowed": "No",
                    "valid_value_range": "Treebo Paradise, The Bliss Palampur, Hotel Radhey Inn etc.",
                    "industry_terms": "Property",
                    "business_criticality": "High"
                },
                "propertyid": {
                    "alias": "Property ID",
                    "data_type": "BIGINT",
                    "business_definition": "Unique numeric identifier for property.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "38596, 38495, 35594 etc.",
                    "industry_terms": "Property",
                    "business_criticality": "High"
                },
                "city": {
                    "alias": "City",
                    "data_type": "TEXT",
                    "business_definition": "City where the property is located.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "Ahmedabad, Palampur, Amravati, Navsari, Surat etc.",
                    "industry_terms": "Location",
                    "business_criticality": "High"
                },
                "state": {
                    "alias": "State",
                    "data_type": "TEXT",
                    "business_definition": "State where the property is located.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "Gujarat, Himachal Pradesh, Punjab, Goa, Karnataka etc.",
                    "industry_terms": "Location",
                    "business_criticality": "Medium"
                },
                "guestname": {
                    "alias": "Guest Name",
                    "data_type": "TEXT",
                    "business_definition": "The person residing in the property.",
                    "unit_of_measure": "String",
                    "null_allowed": "No",
                    "valid_value_range": "Monika Tyagi, Kulwinder Singh, Ankur Jain etc.",
                    "industry_terms": "person name",
                    "business_criticality": "Low"
                },
                "guestid": {
                    "alias": "Guest ID",
                    "data_type": "BIGINT",
                    "business_definition": "Unique number assigned to the person residing in the property.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "275926, 213713, 71223 etc.",
                    "industry_terms": "guest",
                    "business_criticality": "Low"
                },
                "checkindt": {
                    "alias": "Check-In Date",
                    "data_type": "TIMESTAMP",
                    "business_definition": "Date and time on which guest is expected to arrive at the property.",
                    "unit_of_measure": "DateTime",
                    "null_allowed": "No",
                    "valid_value_range": "2018-01-12 00:00:00, 2018-07-19 00:00:00 etc.",
                    "industry_terms": "CheckIn",
                    "business_criticality": "High"
                },
                "checkoutdt": {
                    "alias": "Check-Out Date",
                    "data_type": "TIMESTAMP",
                    "business_definition": "Date and time on which guest wants to leave the property.",
                    "unit_of_measure": "DateTime",
                    "null_allowed": "No",
                    "valid_value_range": "2018-01-16 00:00:00, 2018-07-21 00:00:00 etc.",
                    "industry_terms": "CheckOut",
                    "business_criticality": "High"
                },
                "bookingdate": {
                    "alias": "Booking Date",
                    "data_type": "TIMESTAMP",
                    "business_definition": "Date and time on which the booking was made by the client.",
                    "unit_of_measure": "DateTime",
                    "null_allowed": "No",
                    "valid_value_range": "2018-01-12 00:00:00, 2018-05-15 00:00:00 etc.",
                    "industry_terms": "booking date",
                    "business_criticality": "High"
                },
                "tariff": {
                    "alias": "Tariff",
                    "data_type": "BIGINT",
                    "business_definition": "Tariff value which varies with different properties.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "11559, 3000, 2016 etc.",
                    "industry_terms": "Tax",
                    "business_criticality": "High"
                },
                "markup": {
                    "alias": "Markup",
                    "data_type": "BIGINT",
                    "business_definition": "Markup value which varies with different properties.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "237, 0, 306 etc.",
                    "industry_terms": "Amount",
                    "business_criticality": "Medium"
                },
                "baseprice": {
                    "alias": "Base Price",
                    "data_type": "BIGINT",
                    "business_definition": "Base price which varies with different properties.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "1392, 2542, 1800 etc.",
                    "industry_terms": "Price",
                    "business_criticality": "High"
                },
                "staydays": {
                    "alias": "Stay Days",
                    "data_type": "BIGINT",
                    "business_definition": "Number of days the guest stays in the property.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "1, 2, 3 etc.",
                    "industry_terms": "Stay",
                    "business_criticality": "High"
                },
                "totaltariff": {
                    "alias": "Total Tariff",
                    "data_type": "BIGINT",
                    "business_definition": "Total amount guest pays including tariff for the property.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "1559, 6000, 4032 etc.",
                    "industry_terms": "Total Amount",
                    "business_criticality": "High"
                },
                "tariffpaymentmode": {
                    "alias": "Tariff Payment Mode",
                    "data_type": "TEXT",
                    "business_definition": "Payment mode for tariff.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "Direct, Bill to Client etc.",
                    "industry_terms": "Payment",
                    "business_criticality": "Medium"
                },
                "roomcaptured": {
                    "alias": "Room Captured",
                    "data_type": "BIGINT",
                    "business_definition": "Number of rooms booked by the guest.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "No",
                    "valid_value_range": "1, 2, 3 etc.",
                    "industry_terms": "Total rooms",
                    "business_criticality": "High"
                },
                "status": {
                    "alias": "Status",
                    "data_type": "TEXT",
                    "business_definition": "Condition of the booking (Booked/CheckIn/CheckOut/Canceled).",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "CheckOut, Booked, Canceled, CheckIn etc.",
                    "industry_terms": "bookings",
                    "business_criticality": "High"
                },
                "occupancy": {
                    "alias": "Occupancy",
                    "data_type": "TEXT",
                    "business_definition": "Number of persons staying in the property.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "No",
                    "valid_value_range": "Single, Double etc.",
                    "industry_terms": "No. of persons",
                    "business_criticality": "Medium"
                },
                "rating": {
                    "alias": "Rating",
                    "data_type": "DOUBLE",
                    "business_definition": "Customer review about the property.",
                    "unit_of_measure": "Numeric",
                    "null_allowed": "Yes",
                    "valid_value_range": "1, 2, 3, 4, 5",
                    "industry_terms": "Review score",
                    "business_criticality": "Medium"
                },
                "designation": {
                    "alias": "Designation",
                    "data_type": "TEXT",
                    "business_definition": "Job designation of the guest.",
                    "unit_of_measure": "Categorical",
                    "null_allowed": "Yes",
                    "valid_value_range": "MGR, AM, Senior Officer etc.",
                    "industry_terms": "Job Title",
                    "business_criticality": "Low"
                }
            }
        }
        
    def get_schema_prompt(self) -> str:
        """Generate schema information for agent prompts"""
        schema_text = f"""
                        # HUMMINGBIRD DATABASE SCHEMA

                        **Database:** {DATABASE_NAME}
                        **Table:** {TABLE_NAME}

                        **Table Description:** {self.table_metadata['table_description']}

                        **Available Columns:**

                        """
        for col_name, col_info in self.table_metadata['key_columns'].items():
            schema_text += f"""
- **{col_name}** ({col_info['data_type']})
  - Alias: {col_info['alias']}
  - Definition: {col_info['business_definition']}
  - Criticality: {col_info['business_criticality']}
  - Example Values: {col_info['valid_value_range']}
"""
        
        return schema_text
    
    def get_column_names(self) -> List[str]:
        """Get all column names"""
        return list(self.table_metadata['key_columns'].keys())


def get_comprehensive_kpi_definitions() -> str:
    """Generate comprehensive KPI definitions"""
    return """<comprehensive_kpi_definitions>

<kpi_category name="booking_kpis" table="bookings_dataset">
    
<kpi name="month_on_month_booking_increase" category="growth">
    <business_definition>Measures the percentage increase or decrease in the total number of bookings compared to the previous month.</business_definition>
    <formula>MoM Booking % = ((Current_Month_Bookings - Previous_Month_Bookings) / Previous_Month_Bookings) * 100</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingId, BookingDate</columns_needed>
        <joins>None required</joins>
        <conditions>BookingDate IS NOT NULL</conditions>
        <aggregation>COUNT of BookingId per month</aggregation>
        <group_by>MONTH(BookingDate), YEAR(BookingDate)</group_by>
    </table_requirements>
    <calculation_logic>Calculate total bookings per month, compute percentage change versus previous month.</calculation_logic>
</kpi>
    
<kpi name="unique_clients" category="customer">
    <business_definition>Represents the total number of distinct clients who made at least one booking in the selected period.</business_definition>
    <formula>Unique Clients = COUNT(DISTINCT ClientId)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>ClientId, BookingDate</columns_needed>
        <joins>None required</joins>
        <conditions>ClientId IS NOT NULL</conditions>
        <aggregation>COUNT DISTINCT</aggregation>
        <group_by>Can group by month, city, or state as needed</group_by>
    </table_requirements>
    <calculation_logic>Count unique client IDs within the chosen time window or grouping.</calculation_logic>
</kpi>

<kpi name="total_bookings" category="operational">
    <business_definition>Total number of bookings made in the selected period.</business_definition>
    <formula>Total Bookings = COUNT(DISTINCT BookingId)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingId</columns_needed>
        <joins>None required</joins>
        <conditions>BookingId IS NOT NULL</conditions>
        <aggregation>COUNT DISTINCT</aggregation>
        <group_by>Can group by city, state, client, or time period</group_by>
    </table_requirements>
    <calculation_logic>Count unique booking IDs in the dataset.</calculation_logic>
</kpi>

<kpi name="average_daily_tariff" category="financial">
    <business_definition>Indicates the average tariff charged per room per night, reflecting revenue efficiency.</business_definition>
    <formula>ADR = SUM(TotalTariff) / SUM(StayDays)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>TotalTariff, StayDays</columns_needed>
        <joins>None required</joins>
        <conditions>StayDays > 0</conditions>
        <aggregation>SUM for both TotalTariff and StayDays</aggregation>
        <group_by>City, State, PropertyName, MONTH(BookingDate)</group_by>
    </table_requirements>
    <calculation_logic>Divide total tariff collected by total number of stay days to get average per-night charge.</calculation_logic>
</kpi>

<kpi name="total_revenue" category="financial">
    <business_definition>Total revenue generated from all bookings.</business_definition>
    <formula>Total Revenue = SUM(TotalTariff)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>TotalTariff</columns_needed>
        <joins>None required</joins>
        <conditions>TotalTariff IS NOT NULL</conditions>
        <aggregation>SUM</aggregation>
        <group_by>City, State, ClientName, MONTH(BookingDate)</group_by>
    </table_requirements>
    <calculation_logic>Sum all total tariff values.</calculation_logic>
</kpi>

<kpi name="booking_conversion_rate" category="operational">
    <business_definition>Measures the proportion of confirmed bookings compared to total booking requests.</business_definition>
    <formula>Conversion Rate % = (Confirmed_Bookings / Total_Bookings) * 100</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingId, Status</columns_needed>
        <joins>None required</joins>
        <conditions>Status IN ('CheckOut','CheckIn','Booked','Canceled')</conditions>
        <aggregation>COUNT per Status</aggregation>
        <group_by>MONTH(BookingDate), City, State</group_by>
    </table_requirements>
    <calculation_logic>Count bookings with Status in ('CheckOut','CheckIn','Booked') and divide by total bookings.</calculation_logic>
</kpi>

<kpi name="cancellation_rate" category="operational">
    <business_definition>Percentage of bookings that were canceled.</business_definition>
    <formula>Cancellation Rate % = (Canceled_Bookings / Total_Bookings) * 100</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingId, Status</columns_needed>
        <joins>None required</joins>
        <conditions>Status IS NOT NULL</conditions>
        <aggregation>COUNT per Status</aggregation>
        <group_by>MONTH(BookingDate), City, ClientName</group_by>
    </table_requirements>
    <calculation_logic>Count bookings where Status='Canceled' and divide by total bookings.</calculation_logic>
</kpi>

<kpi name="average_client_rating" category="quality">
    <business_definition>Shows the overall satisfaction of clients based on their given ratings.</business_definition>
    <formula>Average Rating = AVG(Rating)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>Rating, ClientId</columns_needed>
        <joins>None required</joins>
        <conditions>Rating IS NOT NULL</conditions>
        <aggregation>AVG of Rating</aggregation>
        <group_by>PropertyName, City, ClientName</group_by>
    </table_requirements>
    <calculation_logic>Compute the average of ratings received across all bookings within the given dimension.</calculation_logic>
</kpi>

<kpi name="average_stay_duration" category="operational">
    <business_definition>Average number of days guests stay at properties.</business_definition>
    <formula>Average Stay = AVG(StayDays)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>StayDays</columns_needed>
        <joins>None required</joins>
        <conditions>StayDays IS NOT NULL AND StayDays > 0</conditions>
        <aggregation>AVG</aggregation>
        <group_by>PropertyName, City, ClientName</group_by>
    </table_requirements>
    <calculation_logic>Calculate average of StayDays column.</calculation_logic>
</kpi>

<kpi name="occupancy_rate" category="operational">
    <business_definition>Percentage of rooms occupied (based on RoomCaptured).</business_definition>
    <formula>Occupancy Rate % = (Total_Rooms_Booked / Total_Available_Capacity) * 100</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>RoomCaptured, PropertyId</columns_needed>
        <joins>May require property capacity data if available</joins>
        <conditions>RoomCaptured IS NOT NULL</conditions>
        <aggregation>SUM of RoomCaptured</aggregation>
        <group_by>PropertyName, City, MONTH(BookingDate)</group_by>
    </table_requirements>
    <calculation_logic>Sum all rooms captured and divide by total available rooms (if capacity data available).</calculation_logic>
</kpi>

<kpi name="total_guest_count" category="operational">
    <business_definition>The total number of unique guests that have made bookings.</business_definition>
    <formula>Total_guestcount = COUNT(DISTINCT GuestId)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>GuestId</columns_needed>
        <joins>None required</joins>
        <conditions>GuestId IS NOT NULL</conditions>
        <aggregation>COUNT DISTINCT</aggregation>
        <group_by>None (for total count)</group_by>
    </table_requirements>
    <calculation_logic>Count the distinct occurrences of the 'GuestId' column.</calculation_logic>
</kpi>

<kpi name="total_stay_days" category="operational">
    <business_definition>The cumulative sum of all stay durations across all bookings.</business_definition>
    <formula>Total_staydays = SUM(StayDays)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>StayDays</columns_needed>
        <joins>None required</joins>
        <conditions>StayDays IS NOT NULL AND StayDays > 0</conditions>
        <aggregation>SUM</aggregation>
        <group_by>PropertyName, ClientName (or as needed for segmentation)</group_by>
    </table_requirements>
    <calculation_logic>Sum the values in the 'StayDays' column.</calculation_logic>
</kpi>

<kpi name="total_tariff" category="financial">
    <business_definition>The total cumulative tariff (charge/revenue) generated from all bookings.</business_definition>
    <formula>Total_tariff = SUM(TotalTariff)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>TotalTariff</columns_needed>
        <joins>None required</joins>
        <conditions>TotalTariff IS NOT NULL AND TotalTariff > 0</conditions>
        <aggregation>SUM</aggregation>
        <group_by>PropertyName, ClientName (or as needed for segmentation)</group_by>
    </table_requirements>
    <calculation_logic>Sum the values in the 'TotalTariff' column.</calculation_logic>
</kpi>

<kpi name="top_clients_by_bookings" category="customer">
    <business_definition>Identifies clients with the highest number of bookings.</business_definition>
    <formula>Top Clients = ClientName with MAX(COUNT(BookingId))</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>ClientName, BookingId</columns_needed>
        <joins>None required</joins>
        <conditions>ClientName IS NOT NULL</conditions>
        <aggregation>COUNT of BookingId</aggregation>
        <group_by>ClientName</group_by>
        <order_by>COUNT(BookingId) DESC</order_by>
        <limit>10</limit>
    </table_requirements>
    <calculation_logic>Count bookings per client and order by count descending.</calculation_logic>
</kpi>

<kpi name="total_booking_count" category="operational">
    <business_definition>The total number of unique bookings recorded in the system.</business_definition>
    <formula>Totalbookingcount = DISTINCTCOUNT(BookingCode)</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingCode</columns_needed>
        <joins>None required</joins>
        <conditions>BookingCode IS NOT NULL</conditions>
        <aggregation>DISTINCTCOUNT</aggregation>
        <group_by>None (for total count)</group_by>
    </table_requirements>
    <calculation_logic>Count the number of unique values in the 'BookingCode' column.</calculation_logic>
</kpi>

<kpi name="total_loss_or_gain" category="financial">
    <business_definition>The cumulative sum of the 'maxlossorgain' calculated for each unique booking.</business_definition>
    <formula>SELECT SUM(maxlossorgain) FROM (SELECT BookingCode, MAX(lossorgain_source_column) AS maxlossorgain FROM WRBHBBookingStatus GROUP BY BookingCode) AS T</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingCode, lossorgain_source_column (assuming the maxlossorgain measure is derived from a column like lossorgain_source_column)</columns_needed>
        <joins>None required</joins>
        <conditions>None specified</conditions>
        <aggregation>SUM (on pre-aggregated booking-level values)</aggregation>
        <group_by>None (The internal calculation aggregates by BookingCode)</group_by>
    </table_requirements>
    <calculation_logic>logic is implemented in MySQL by first identifying the 'maxlossorgain' value for each distinct 'BookingCode' (potentially using a subquery with MAX/GROUP BY) and then summing these booking-level results.</calculation_logic>
</kpi>

<kpi name="total_occupancy" category="operational">
    <business_definition>The cumulative sum of the 'maxoccupancy' calculated for each unique booking.</business_definition>
    <formula>SELECT SUM(maxoccupancy) FROM (SELECT BookingCode, MAX(occupancy_source_column) AS maxoccupancy FROM WRBHBBookingStatus GROUP BY BookingCode) AS T</formula>
    <table_requirements>
        <primary_table>WRBHBBookingStatus</primary_table>
        <columns_needed>BookingCode, occupancy_source_column (assuming the maxoccupancy measure is derived from a column like occupancy_source_column)</columns_needed>
        <joins>None required</joins>
        <conditions>None specified</conditions>
        <aggregation>SUM (on pre-aggregated booking-level values)</aggregation>
        <group_by>None (The internal calculation aggregates by BookingCode)</group_by>
    </table_requirements>
    <calculation_logic>logic is implemented in MySQL by first identifying the 'maxoccupancy' value for each distinct 'BookingCode' (potentially using a subquery with MAX/GROUP BY) and then summing these booking-level results.</calculation_logic>
</kpi>

<kpi name="total_tariff_1_row_level" category="financial_detail">
    <business_definition>The total tariff (cost) for a single booking line item, calculated by multiplying the number of stay days by the tariff rate.</business_definition>
    <formula>Staydays * Tariff</formula>
    <table_requirements>
        <primary_table>WRBHBBookingStatus</primary_table>
        <columns_needed>Staydays, Tariff</columns_needed>
        <joins>None required</joins>
        <conditions>Staydays1 IS NOT NULL AND Tariff IS NOT NULL</conditions>
        <aggregation>Multiplication (Row-Level)</aggregation>
        <group_by>None (Calculated per row)</group_by>
    </table_requirements>
    <calculation_logic>Multiply the value in the 'Staydays1' column by the value in the 'Tariff' column for each individual row.</calculation_logic>
</kpi>

<kpi name="top_properties_by_revenue" category="financial">
    <business_definition>Properties generating the highest revenue.</business_definition>
    <formula>Top Properties = PropertyName with MAX(SUM(TotalTariff))</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>PropertyName, TotalTariff</columns_needed>
        <joins>None required</joins>
        <conditions>TotalTariff IS NOT NULL</conditions>
        <aggregation>SUM of TotalTariff</aggregation>
        <group_by>PropertyName</group_by>
        <order_by>SUM(TotalTariff) DESC</order_by>
        <limit>10</limit>
    </table_requirements>
    <calculation_logic>Sum revenue per property and order by sum descending.</calculation_logic>
</kpi>

<kpi name="booking_trend_by_month" category="trend">
    <business_definition>Monthly trend of bookings over time.</business_definition>
    <formula>Monthly Bookings = COUNT(BookingId) per month</formula>
    <table_requirements>
        <primary_table>bookings_dataset</primary_table>
        <columns_needed>BookingId, BookingDate</columns_needed>
        <joins>None required</joins>
        <conditions>BookingDate IS NOT NULL</conditions>
        <aggregation>COUNT of BookingId</aggregation>
        <group_by>YEAR(BookingDate), MONTH(BookingDate)</group_by>
        <order_by>YEAR(BookingDate), MONTH(BookingDate)</order_by>
    </table_requirements>
    <calculation_logic>Count bookings grouped by year and month, ordered chronologically.</calculation_logic>
</kpi>

</kpi_category>

</comprehensive_kpi_definitions>"""


# Initialize schema
hummingbird_schema = HummingBirdSchema()

print(f"[SCHEMA] ✅ HummingBird schema initialized")
print(f"[SCHEMA] 📊 Table: {TABLE_NAME}")
print(f"[SCHEMA] 🔧 Columns: {len(hummingbird_schema.get_column_names())}")

